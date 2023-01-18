/*********************************************  PLUGIN *************************************************************/

jQuery(function($) {

    jQuery.switcher = function(element, options) {
        this.element = element;
        this.$element = $( element );
        var defaults = {
            pane: 'right',
            presetLinker: 'lgx-master-style',
            bgLinker: 'lgx-switcher-bg-linker',

            //for color scheme
            colorHeaderText: 'Presets Color',
            colorCssPath: './css',
            color: false,

            //for background image or color
            backgroundImageText: 'Background',
            imagePath: './img',
            bgCssPath: './switcher/css/bg',
            bgImageThumb: false,

            //for different layout
            layoutText: '- 13 Layouts',
            layoutImagePath: './img/layout',
            layout: false
        };

        this.defaultOptions = jQuery.extend( {}, defaults, options );

        this.__init();

    };

    jQuery.extend( jQuery.switcher.prototype, {
        __init: function() {
            var self = this,
                pane = (this.defaultOptions.pane == 'right') ? ' right-pane' : ' left-pane';
            self.switcherHtml = [];

            $( 'head' ).append( '<link rel="stylesheet" href="./switcher/css/demo-themeoptions.css" media="all" />' );
            self.switcherHtml.push( '<div class="lgx-theme-options' + pane + '">' );//push main container
            self.switcherHtml.push( '<div class="lgx-options-inner">' );//option container
            self.switcherHtml.push( '<a href="javascript:void(0);" class="lgx-option-trigger"><i class="fa fa-cog fa-spin"></i></a>' );//option trigger button

            /*==============================================Start=====================================================*/
            if ( false != self.defaultOptions.color ) {
                self.switcherHtml.push( '<div class="lgx-option-section">' );//color option section
                self.switcherHtml.push( '<h4>' + self.defaultOptions.colorHeaderText + '</h4>' );//color header
                self.switcherHtml.push( '<ul class="lgx-presets preset-container clearfix">' );//color plate container

                //load all color plate
                var index = 0;
                $.each( self.defaultOptions.color, function( styleName, styleColor ) {
                    index += 1;
                    if ( index == 1 ) {
                        self.switcherHtml.push( '<li class="lgx-preset active">' );//default active
                    } else {
                        self.switcherHtml.push( '<li class="lgx-preset">' );
                    }
                    self.switcherHtml.push( '<a href="javascript:void(0);" data-style="preset" class="lgx-opt-thumb" data-style-name="' + styleName + '" style="background-color: ' + styleColor + '"></a>' );
                    self.switcherHtml.push( '</li>' );
                } );
                //end load

                self.switcherHtml.push( '</ul>' );//end color plate container
                self.switcherHtml.push( '</div>' )//end color option section
            }
            /*==============================================End=====================================================*/

            /*==============================================Start=====================================================*/
            if ( false != self.defaultOptions.bgImageThumb ) {
                self.switcherHtml.push( '<div class="lgx-option-section" style="display:none">' );//background image/color option section
                self.switcherHtml.push( '<h4>' + self.defaultOptions.backgroundImageText + '</h4>' );//background image/color header
                self.switcherHtml.push( '<ul class="lgx-bg-images preset-container clearfix">' );//background image/color plate container

                //load all background plate
                $.each( self.defaultOptions.bgImageThumb, function( styleName, imageOrColorName ) {
                    var exp = /^.*\.(jpg|jpeg|gif|png)$/;
                    self.switcherHtml.push( '<li class="lgx-preset">' );
                    if ( exp.test( imageOrColorName ) ) {
                        self.switcherHtml.push( '<a href="javascript:void(0);" class="lgx-opt-thumb" data-style="bg" data-style-name="' + styleName + '"><img class="img-responsive" src="' + self.defaultOptions.imagePath + '/' + imageOrColorName + '" alt=""></a>' );
                    } else {
                        self.switcherHtml.push( '<a href="javascript:void(0);" class="lgx-opt-thumb" data-style="bg" data-style-name="' + styleName + '" style="background-color: ' + imageOrColorName + '"></a>' );
                    }
                    self.switcherHtml.push( '</li>' );
                } );
                //end load

                self.switcherHtml.push( '</ul>' );//end background image/color plate container
                self.switcherHtml.push( '</div>' )//end background image/color option section
            }
            /*==============================================End=====================================================*/

            /*==============================================Start=====================================================*/
            if ( false != self.defaultOptions.layout ) {
                self.switcherHtml.push( '<div class="lgx-option-section">' )//layout option section
                self.switcherHtml.push( '<h4>' + self.defaultOptions.layoutText + '</h4>' )//layout option header
                self.switcherHtml.push( '<ul class="lgx-bg-layout preset-container clearfix">' )//layout plate container

                //load layout plate
                $.each( self.defaultOptions.layout, function(index, layoutObj) {
                    self.switcherHtml.push( '<li class="lgx-preset">' );
                    self.switcherHtml.push( '<a href="' + layoutObj.link + '" class="lgx-opt-thumb">' );
                    self.switcherHtml.push( '<img src="' + self.defaultOptions.layoutImagePath + '/' + layoutObj.image + '" alt=""/>' );
                    self.switcherHtml.push( '<div class="layout-img-holder fadeInUp">' );
                    self.switcherHtml.push( '<img src="' + self.defaultOptions.layoutImagePath + '/' + layoutObj.image + '" alt=""/>' );
                    self.switcherHtml.push( '</div>' );
                    self.switcherHtml.push( '</a>' );
                    self.switcherHtml.push( '</li>' );
                } );
                //end load

                self.switcherHtml.push( '</ul>' );//end layout plate container
                self.switcherHtml.push( '</div>' )//end layout option section
            }
            /*=============================================End======================================================*/


            self.switcherHtml.push( '</div>' );//end option container
            self.switcherHtml.push( '</div>' );//end main container


            self.$element.html( self.switcherHtml.join( '' ) );

            self.__clickOnTrigger();
            self.__clickOnThumbPlate();
        },

        __clickOnTrigger: function() {
            var self = this;
            self.$element.find( 'a.lgx-option-trigger' ).on( 'click', function() {
                $this = $( this );
                $this.parents( '.lgx-theme-options' ).toggleClass( 'lgx-open' );
            } );
        },

        __clickOnThumbPlate: function() {
            var self = this;
            $( self.$element.find( '.lgx-option-section' ) ).on( 'click', 'a.lgx-opt-thumb', function() {
                var $this = $( this );
                $this
                    .parents( '.lgx-option-section' )
                    .find( 'li.lgx-preset' )
                    .removeClass( 'active');

                $this.parent().addClass( 'active' );

                var $presetLinker = $( '#' + self.defaultOptions.presetLinker );//preset color style linker
                var $bgLinker = $( '#' + self.defaultOptions.bgLinker );//bg style linker

                if ( $this.data( 'style' ) == 'bg' ) {
                    if ( $bgLinker.length == 0 ) {
                        var link = '<link id="' + self.defaultOptions.bgLinker + '" rel="stylesheet" href="#" media="all" />';
                        $( 'head' ).append( link );
                    }

                    $( 'head' ).find( '#' + self.defaultOptions.bgLinker).attr( 'href', self.defaultOptions.bgCssPath + '/' + $this.data( 'style-name' ) + '.css' )
                } else {
                    if ( $presetLinker.length == 0 ) {
                        var link = '<link id="' + self.defaultOptions.presetLinker + '" rel="stylesheet" href="#" media="all" />';
                        // $( 'head' ).append( link );
                    }

                    $( 'head' ).find( '#' + self.defaultOptions.presetLinker).attr( 'href', self.defaultOptions.colorCssPath + '/' + $this.data( 'style-name' ) + '.css' )
                }
            } );
        }
    } );



    jQuery.fn.switcher = function(options) {
        var elem = this;
        return elem.each( function(index) {
            //console.log(elem);
            if ( 'undefined' == typeof $( elem ).eq( index ).data( 'lgx-switcher' ) ) {
                var switcher = new jQuery.switcher( elem, options );
                $( elem ).eq( index ).data( 'lgx-switcher', switcher );
            }
        } );
    };

    /********************************************* MAIN PLUGIN END *************************************************************/
});



