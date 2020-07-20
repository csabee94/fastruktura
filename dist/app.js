"use strict";

const url = "http://api.index.hu/folders/folders/index.hu";
const openedArr = [];
let lastId = 263;

function getData() {
  return new Promise( ( resolve, reject ) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ( event ) => {
      if( event.target.readyState === 4 && event.target.status === 200 ) {
        const result = JSON.parse( event.target.responseText );
        resolve( result.data );
      } else if ( event.target.readyState === 4 && event.target.status !== 200 ) {
        reject( new Error(`Error code: ${event.target.status}`) );
      }
    }

    xhr.open( "GET", url );
    xhr.setRequestHeader( "Authorization","85IsCGestuf5B6WdaPC6QJl8v94tQuDjwEFqUCt4pp0EeqBJH" );
    xhr.send();
  });
}


getData().then( data => {
  console.log( data[0].children);
  data[0].children.forEach( children => {
    recursiveReadItems( children, 0 );
  } );
}).catch( error => {
  console.log( error );
});

function recursiveReadItems( item, level ) {
  const element = document.getElementById( item.parentId.toString() );
  if ( element ){
    const createdElement = createMenuElement( item, 'none', level );
    element.appendChild( createdElement );
  } else {
    const createdElement = createMenuElement( item, 'block', level );
    document.getElementById( 'navigation' ).appendChild( createdElement );
  }
  if ( Array.isArray( item.children ) ){
    item.children.forEach( item => {
      recursiveReadItems( item, level + 1 );
    });
  }
}

function createMenuElement( item, defaultDisplay, level ) {
  const createdElement = document.createElement( 'li' );
  const lastPath = item.path.split("/");
  createdElement.id = item.folderId;
  createdElement.innerHTML = lastPath[lastPath.length-2];
  createdElement.className = `level-${level}`;
  createdElement.setAttribute( 'style', `display: ${defaultDisplay};` );
  createdElement.addEventListener( 'click', ( event ) => {
      event.stopPropagation();
        document.getElementById( item.folderId ).childNodes.forEach( element => {
          if ( element instanceof HTMLElement ) {
              if ( openedArr.includes( element.id ) ){
                  element.setAttribute( 'style', `display: none;` );
                  const idx = openedArr.indexOf( element.id );
                  openedArr.splice( idx, 1 );
              } else {
                  document.getElementById('conent').src = 'https://' + item.siteUrl + item.path;
                  element.setAttribute( 'style', `display: block;` );
                  openedArr.push( element.id );
              }

          }
      })
  });
  return createdElement;
}

document.getElementById("navigation").addEventListener( "click", saveId, true );

function saveId(e) {
  lastId = e.target.id;
  document.getElementById("editbox").value = e.target.innerText;
}
