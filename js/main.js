(function() {
  'use strict';

  var Handlebars  = require( 'handlebars' );
  var Templates   = require( './templates.js' );
  var Posts       = require( './posts.js' );
  var Post        = require( './post.js' );
  var page        = require( 'page' );
  var tmpls       = Handlebars.templates;
  var posts       = [];
  var $container  = null;

  window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function accumulatePosts () {
    var isPostFormatRegEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z-/,
        postSplitterRegEx = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-(.*)$/;

    for ( var tmpl in tmpls ) {
      if ( tmpls.hasOwnProperty ( tmpl ) ) {
        if ( isPostFormatRegEx.test( tmpl ) ) {
          var date = tmpl.replace( postSplitterRegEx, '$1' ),
              name = tmpl.replace( postSplitterRegEx, '$2' )
                      .replace( /\-{3}/g, ' - ' )
                      .replace( /([^\- ])\-([^\- ])/g, '$1 $2' );

          var post = new Post( date, name, tmpls[ tmpl ] );
          posts.push( post );
        }
      }
    }

    //  Order by latest
    posts.sort(function (a, b) {
      var _a = new Date(a.date).getTime();
      var _b = new Date(b.date).getTime();

      return _b - _a;
    });

    posts.forEach(function updateIDs (post, idx) {
      post.id = idx;
    });
  }

  function addMostRecentPosts () {
    var $postList = $( '.post-list' ),
        str = '';

    $postList.empty();

    for ( var i = 0, l = Math.min(5, posts.length); i < l; i++ ) {
      str += '<li><a href="/post/' + posts[i].id + '" class="hover-color">' + posts[i].name + '</a></li>';
    }

    $postList.append( str );
  }

  function findNewsHrefFor (el) {
    var title = el.attr('title');
    var content = el.text();

    var post = posts.filter(function (p) {
      return p.name === title;
    })[0] || null;

    if (post) {
      return '/post/'+post.id;
    } else {
      return '#';
    }
  }

  function setPage ( ctx, next ) {
    var page = ctx.path.substring(1);

    //  Ensure / matches index
    if ( page.length === 0 ) {
      page = 'index';
    }

    ctx.page = page;

    //  Set as 404 if 1) we don't have a template for it and 2) it's not a post
    if ( !tmpls.hasOwnProperty( page ) && !/^\/post\/\d+$/.test( ctx.path ) ) {
      ctx.path = '/404';
      ctx.page = '404';
    }

    //  Continue down callback chain
    if ( !!next ) {
      next();
    }
  }

  function setActiveLinkBasedOnPath ( ctx, next ) {
    var path = ctx.path !== '/404' ? ctx.path : '/',
        $active = $( '.active' ),
        $target = $( 'nav a[href="' + ctx.path + '"]' ),
        dropdowns = $target.parents( '.dropdown' );

    requestAnimationFrame(function () {
      $active.removeClass( 'active' );
      
      if ( dropdowns.length > 0 ) {
        dropdowns.addClass( 'active' );
      }
      else {
        $target.addClass( 'active' );
      }

      $target.parent().addClass( 'active' );
    });
    
    //  Continue down callback chain
    if ( !!next ) {
      next();
    }
  }

  function showPost ( ctx, next ) {
    var post = posts[ +ctx.params.id ];

    if ( !!$container ) {
      requestAnimationFrame(function () {
        $container.html( post.content( {} ) );
      });
    }

    if ( !!next ) {
      next();
    }
  }

  function showPage ( ctx, next ) {
    if ( tmpls.hasOwnProperty( ctx.page ) ) {
      if ( !!$container ) {
        requestAnimationFrame(function () {
          var isNewsPage = ctx.page === 'news';
          var data = isNewsPage ? {posts: posts} : {};
          $container.html( tmpls[ ctx.page ]( data ) )
            .promise()
            .done(function updateNewsLinks () {
              if (isNewsPage) {
                $('.news--link').each(function () {
                  var el = $(this);
                  el.attr('href', findNewsHrefFor(el));
                });
              }
            });
        });
      }
    }

    //  Stops the chain of callbacks
  }

  function fixFooter () {
    // Fix the padding for the content so that the footer is always at the bottom
    function getPadding ($el, dir) {
      if (!$el || !dir) return 0;
      return +($el.css('padding-'+dir).replace(/px/, ''));
    }

    var footer = $('#footer-defoult');
    var content = $('#latest-news');
    var contentPaddingBottom = getPadding(content, 'bottom');
    var footerHeight = footer.height();
    var footerPaddingTop = getPadding(footer, 'top');
    var footerPaddingBottom = getPadding(footer, 'bottom');
    var footerTotalHeight = footerPaddingTop + footerHeight + footerPaddingBottom;

    content.css('padding-bottom', (contentPaddingBottom + footerTotalHeight) + 'px');
  }

  function updateCopyright () {
    var year = new Date().getFullYear();
    $('.copyright--year').html(year);
  }

  function unobfuscateEmails () {
    // present de-obfuscated emails
    (Array.prototype.slice.call(document.getElementsByClassName('obfuscated-email'))).forEach(function (c) {
        var d = document.createElement('a');
        var e = 'vasb@erq5.bet';
        var f = e.replace(/[a-zA-Z]/g, function (g) {
            return String.fromCharCode(('Z' >= g ? 90 : 122) >= (g = g.charCodeAt(0) + 13) ? g : g - 26);
        });
        if (/make-mailer/.test(c.className)) {
            d.className = 'mailer';
        }
        d.href = 'mailto:'+f;
        d.innerHTML = f;
        c.parentNode.replaceChild(d,c);
    });
  }

  $( document ).ready( function () {
    $container = $( '#latest-news .container' );

    accumulatePosts();

    //  Setup routing
    page( '*', setPage, setActiveLinkBasedOnPath );
    page( '/post/:id', showPost );
    page( '*', showPage );

    page( {
      hashbang: true
    } );

    requestAnimationFrame(function firstFrameUpdates () {
      addMostRecentPosts();
      fixFooter();
      updateCopyright();
      unobfuscateEmails();
    });
  } );
})();