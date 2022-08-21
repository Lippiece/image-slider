// https://www.behance.net/gallery/116696659/Kombu-Art-Design-Culture-Magazine
import { css } from "@emotion/css";
// import all images
import source1 from "./1.jfif";
import source2 from "./2.jfif";
import source3 from "./3.jfif";

Element.prototype.appendTo = function( parent )
{
	parent.append( this );

	return this;
};
Element.prototype.addId    = function( id )
{
	this.id = id;

	return this;
};
Element.prototype.addStyles = function( styles )
{
	typeof styles === "object" ? this.classList.add( ...styles ) : this.classList.add( styles );

	return this;
};
const _body                 = document.querySelector( "body" )
	.addStyles( css( {
		"--mainColor"  : "hsla(15, 100%, 60%, 0.7)",
		backgroundColor: "#222",
		height         : "100vh",
		width          : "100vw",
		display        : "flex",
		flexDirection  : "column",
		justifyContent : "center",
		color          : "var( --mainColor )",
	} ) );

class ImageSlider
{
	initializeImageSlider( parent, images )
	{
		const container = document.createElement( "div" )
				.addStyles( css( {
					display       : "flex",
					flexDirection : "column",
					justifyContent: "center",
				} ) )
				.addId( "image-slider-container" ),
			imageSlider = document.createElement( "div" )
				.addStyles( css( {
					maxWidth     : "100vw",
					height       : "100%",
					display      : "flex",
					flexDirection: "row",
					gap          : "0.5em",
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
	populateSlider( images )
	{
		for ( const source of images )
		{
			new Image( source, this )
				.addId( `image-${ images.indexOf( source )+1 }` );
		}
	}
	addListeners( imageSlider )
	{
		/* Scroll horizontally */
		imageSlider.addEventListener( "wheel", ( event ) =>
		{
			event.preventDefault();
			imageSlider.scrollLeft += event.deltaY/2;
		} );
	}
	addScrollProgress( imageSlider )
	{
		const scrollProgress = document.createElement( "div" )
			.addStyles( css( {
				position       : "relative",
				left           : "25%",
				height         : "0.5em",
				width          : "0%",
				backgroundColor: "var( --mainColor )",
				transition     : "all 0.5s ease",
			} ) )
			.addId( "scroll-progress" )
			.appendTo( imageSlider.parentElement );

		imageSlider.addEventListener( "scroll", () =>
		{ scrollProgress.style.width = `${ imageSlider.scrollLeft / ( imageSlider.scrollWidth - imageSlider.clientWidth ) * 50 }%` } );
	}
	constructor( parent, images )
	{ this.initializeImageSlider( parent, images ) }
}
class Image
{
	toggleCurrentImage( image )
	{
		image.classList.toggle( css( {
			marginLeft : "2em",
			marginRight: "2em",
			height     : "30em",
		} ) );
	}
	removeCurrentIfPresent( image )
	{
		if ( image.classList.contains( css( {
			marginLeft : "2em",
			marginRight: "2em",
			height     : "30em",
		} ) ) ) { this.toggleCurrentImage( image ) }
	}
	resetCurrentImage()
	{
		for ( const image of this.slider.div.children )
		{ this.removeCurrentIfPresent( image ) }
	}
	addEventListeners( )
	{
		this.img.addEventListener( "click", ( event ) =>
		{
			this.resetCurrentImage( this.slider );
			this.toggleCurrentImage( event.target );
			this.slider.div.scrollLeft = event.target.offsetLeft - this.slider.div.offsetLeft;
		} );

	}
	constructor( source, slider )
	{
		this.img = document.createElement( "img" );
		this.img
			.addStyles( css( {
				height    : "20em",
				cursor    : "pointer",
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
const _testSlider = new ImageSlider( document.querySelector( "#content" ), [source1, source2, source3] );
