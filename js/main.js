$(document).ready(function() {
    'use strict';

    //easescroll for website
    $("html").easeScroll({
        frameRate: 60,
        animationTime: 1000,
        stepSize: 210,
        pulseAlgorithm: 1,
        pulseScale: 8,
        pulseNormalize: 1,
        accelerationDelta: 20,
        accelerationMax: 1,
        keyboardSupport: true,
        arrowScroll: 50,
        touchpadSupport: true,
        fixedBackground: true
    });

    // Scroll Navbar
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > 10) {
            $('.navbar').addClass('nav-scroll');
        } else {
            $('.navbar').removeClass('nav-scroll');
        }
    });

    //smoothly Scroll To Element
    $('.navbar-nav li a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset().top + 1
        }, 1000);
    });

    // Sync Links With Sections
    $(window).on('scroll', function() {
        $('section').each(function() {
            if ($(window).scrollTop() > $(this).offset().top) {
                var secID = $(this).attr('id');
                $('.navbar-nav li a').removeClass('active-li');
                $('.navbar-nav li a[data-scroll="' + secID + '"]').addClass('active-li');
            }
        });
    });

    // Scroll Too Top
    $('.scroll-top').on('click', function() { $('html, body').animate({ scrollTop: 0 }, 1000); });

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.scroll-top').fadeIn('slow');
        } else {
            $('.scroll-top').fadeOut('slow');
        }
    });

    //Shwo Color Option Div When Click On The Gear
    $('.gear-check').on('click', function() {
        $(".color-option").fadeToggle();
    });

    //Chage Theme Color On Click
    var colorLi = $(".color-option ul li");

    colorLi
        .eq(0).css("backgroundColor", "#29afc6").end()
        .eq(1).css("backgroundColor", "#e6c04e").end()
        .eq(2).css("backgroundColor", "#97bc5b").end()
        .eq(3).css("backgroundColor", "#6353c7").end()
        .eq(4).css("backgroundColor", "#fff").end()
        .eq(5).css("backgroundColor", "#404040");

    colorLi.on('click', function() {
        $("link[href*='color']").attr("href", $(this).attr("data-value"));
    });

    colorLi.on('click', function() {
        $("link[href*='background']").attr("href", $(this).attr("data-animal-type"));
    });

    // Gallery works Section
    var contact = document.querySelector('.contact');
    var mixit = mixitup(contact);

    // Adjust Selected Shuffle Links
    $('.shuffle li').on('click', function() {
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // Owl Carousel Section App Screenshots
    $('.services .owl-carousel').owlCarousel({
        autoplay: 2000,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        rewind: true,
        margin: 10,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 3
            }
        }
    });

    // Owl Carousel Section App Screenshots
    $('.clients .owl-carousel').owlCarousel({
        autoplay: 2000,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        rewind: true,
        margin: 10,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

}); //End Document Function

//loading Screen
$(window).on('load', function() {
    $(".loading-over .spinner").fadeOut(0,

        function() {
            $("body").css("overflow", "auto");
            $(this).parent().fadeOut(0,

                function() {
                    $(this).remove();
                });

        });
});
