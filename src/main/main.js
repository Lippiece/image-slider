import { css } from "@emotion/css";

import Image from "./image.js";

  parent.append( this );

  return this;

};
Element.prototype.addId    = function( id ) {

  this.id = id;

  return this;

};
Element.prototype.addStyles = function( styles ) {

  typeof styles === "object" ? this.classList.add( ...styles ) : this.classList.add( styles );

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

class Image {

  toggleCurrentImage( image ) {

    image.classList.toggle( css( {
      height     : "30em",
      marginLeft : "2em",
      marginRight: "2em",
    } ) );

  }
  removeCurrentIfPresent( image ) {

    if ( image.classList.contains( css( {
      height     : "30em",
      marginLeft : "2em",
      marginRight: "2em",
    } ) ) ) { this.toggleCurrentImage( image ) }

  }
  resetCurrentImage() {

    for ( const image of this.slider.div.children ) { this.removeCurrentIfPresent( image ) }

  }
  addEventListeners( ) {

    this.img.addEventListener( "click", event => {

      this.resetCurrentImage( this.slider );
      this.toggleCurrentImage( event.target );
      this.slider.div.scrollLeft = event.target.offsetLeft - this.slider.div.offsetLeft;

    } );

  }
  constructor( source, slider ) {

    this.img = document.createElement( "img" );
    this.img
      .addStyles( css( {
        cursor    : "pointer",
        height    : "20em",
        transition: "all 0.5s ease",
				 } ) )
      .src = source;
    slider.div.append( this.img );
    this.slider = slider;
    this.source = source;
    this.addEventListeners();

    return this.img;

  }

}
