var fs = require( 'fs' );
var title = (process.argv[2] || 'Dummy Post').trim();
var postTitle = title.replace( /\s/g, '-' );
var today = (new Date()).toISOString();
var postFilename = 'posts/' + today + '-' + postTitle + '.hbs';

fs.writeFile( postFilename, '<h1>'+title+'</h1>\n<p>Put your content here.</p>\n', function( err1 ) {
  if ( err1 ) {
    console.log( 'Failed to create the post file.' );
    process.exit( 1 );
  } else {
    process.exit( 0 );
  }
} );
