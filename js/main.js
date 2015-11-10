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

          posts.push( new Post( date, name, tmpls[ tmpl ] ) );
        }
      }
    }
  }

  function addMostRecentPosts () {
    var $postList = $( '.post-list' ),
        str = '';

    $postList.empty();

    for ( var i = 0, l = Math.min(5, posts.length); i < l; i++ ) {
      str += '<li><a href="/post/' + i + '" class="hover-color">' + posts[i].name + '</a></li>';
    }

    $postList.append( str );
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

    $active.removeClass( 'active' );
    
    if ( dropdowns.length > 0 ) {
      dropdowns.addClass( 'active' );
    }
    else {
      $target.addClass( 'active' );
    }

    $target.parent().addClass( 'active' );
    
    //  Continue down callback chain
    if ( !!next ) {
      next();
    }
  }

  function showPage ( ctx, next ) {
    if ( tmpls.hasOwnProperty( ctx.page ) ) {
      if ( !!$container ) {
        var data = ctx.page === 'news' ? {posts: posts} : {};
        $container.html( tmpls[ ctx.page ]( data ) );
      }
    }

    //  Stops the chain of callbacks
  }

  function showPost ( ctx, next ) {
    var post = posts[ +ctx.params.id ];

    if ( !!$container ) {
      $container.html( post.content( {} ) );
    }

    if ( !!next ) {
      next();
    }
  }

  $( document ).ready( function () {
    $container = $( '#latest-news .container' );

    accumulatePosts();
    addMostRecentPosts();

    //  Setup routing
    page( '*', setPage, setActiveLinkBasedOnPath );
    page( '/post/:id', showPost );
    page( '*', showPage );

    page( {
      hashbang: true
    } );
  } );
})();