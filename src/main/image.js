export default class Image {

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
