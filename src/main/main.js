import { css } from "@emotion/css";

import Image from "./image.js";

Element.prototype.appendTo = function appendTo( parent ) {

  parent.append( this );

  return this;

};
Element.prototype.addId    = function addId( id ) {

  this.id = id;

  return this;

};
Element.prototype.addStyles   = function addStyles( styles ) {

  typeof styles === "object" ? this.classList.add( ...styles ) : this.classList.add( styles );

  return this;

};
Element.prototype.chainAppend = function chainAppend( ...elements ) {

  elements.map( element => this.append( element ) ) || this.append( ...elements );

  return this;

};
export default class ImageSlider {

  initializeImageSlider( parent, images ) {

    const container   = document.createElement( "div" )
      .addStyles( css( {
        display       : "flex",
        flexDirection : "column",
        justifyContent: "center",
      } ) )
      .addId( "image-slider-container" );
    const imageSlider = document.createElement( "div" )
      .addStyles( css( {
        display      : "flex",
        flexDirection: "row",
        gap          : "0.5em",
        height       : "100%",
        maxWidth     : "100vw",
        overflow     : "hidden",
      } ) )
      .addId( "image-slider" )
      .appendTo( container );

    this.div = imageSlider;
    this.populateSlider( images );
    this.addListeners( imageSlider );
    this.addScrollProgress( imageSlider );
    parent.append( container );

  }
  populateSlider( images ) {

    for ( const source of images ) {

      new Image( source, this )
        .addId( `image-${ images.indexOf( source ) + 1 }` );

    }

  }
  addListeners( imageSlider ) {

    /* Scroll horizontally */
    imageSlider.addEventListener( "wheel", event => {

      event.preventDefault();
      imageSlider.scrollLeft += event.deltaY / 2;

    } );

  }
  addScrollProgress( imageSlider ) {

    const scrollProgress = document.createElement( "div" )
      .addStyles( css( {
        backgroundColor: "var( --mainColor )",
        height         : "0.5em",
        left           : "25%",
        position       : "relative",
        transition     : "all 0.5s ease",
        width          : "0%",
      } ) )
      .addId( "scroll-progress" )
      .appendTo( imageSlider.parentElement );

    imageSlider.addEventListener( "scroll", () => { scrollProgress.style.width = `${ imageSlider.scrollLeft / ( imageSlider.scrollWidth - imageSlider.clientWidth ) * 50 }%` } );

  }
  constructor( parent, images ) { this.initializeImageSlider( parent, images ) }

}

console.debug( "Module loaded: ImageSlider" );
