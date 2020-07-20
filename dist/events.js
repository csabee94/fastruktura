// Search
$( "#searchbox" ).on( "keyup", function() {
  let value = $( this ).val().toLowerCase();
  $( "#navigation li" ).filter( function() {
    $( this ).toggle( $( this ).text().toLowerCase().indexOf( value ) > -1 ).toggleClass( "highlight" );
  });
});

// Save last clicked

$( "#edit" ).click(function() {
  const name = $( "#editbox" ).val();
  $( "#" + lastId ).text( name );
});
