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

initializeImageSlider( document.querySelector( "#content" ), [source1, source2, source3] );
function initializeImageSlider( parent, images )
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

	populateSlider( imageSlider, images );
	addListeners( imageSlider );
	addScrollProgress( imageSlider );
	parent.append( container );
}
/**
	* It takes a parent element and an array of image sources, and then creates an image element for each
	* source, and appends it to the parent
	* @param parent - The parent element to append the images to.
	* @param images - An array of image sources.
	*/
function populateSlider( parent, images )
{
	for ( const source of images )
	{
		const image = document.createElement( "img" );

		image
			.addStyles( css( {
				height: "20em",
				cursor: "pointer",
			 } ) )
			.addId( `image-${ images.indexOf( source )+1 }` )
			.src = source;
		parent.append( image );
	}
}
function setCurrentImage( image )
{
	image.classList.toggle( css( {
		marginLeft : "2em",
		marginRight: "2em",
		height     : "30em",
	} ) );
}
function addListeners( imageSlider )
{
	imageSlider.addEventListener( "click", ( event ) =>
	{
		if ( event.target.id.startsWith( "image-" ) )
		{
			setCurrentImage( event.target );
			event.target.addEventListener( "mouseleave", () =>
			{ setCurrentImage( event.target ) }, { once: true } );
		}
	} );
	imageSlider.addEventListener( "wheel", ( event ) =>
	{
		event.preventDefault();
		imageSlider.scrollLeft += event.deltaY/2;
	} );
}
function addScrollProgress( imageSlider )
{
	const scrollProgress = document.createElement( "div" )
		.addStyles( css( {
			height         : "0.5em",
			width          : "100%",
			backgroundColor: "var( --mainColor )",
			transition     : "all 0.5s ease",
		} ) )
		.addId( "scroll-progress" )
		.appendTo( imageSlider.parentElement );

	imageSlider.addEventListener( "scroll", () =>
	{ scrollProgress.style.width = `${ imageSlider.scrollLeft / ( imageSlider.scrollWidth - imageSlider.clientWidth )  * 100 }%` } );
}
