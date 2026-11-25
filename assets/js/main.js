/**
 * SABURI PLYWOOD - MAIN JAVASCRIPT
 * Initialises:
 * 1. Slick Sliders:
 *    - Our Products (.products-slider)
 *    - Why Choose Us (.why-choose-slider)
 *    - What Our Customers Say (.testimonials-slider)
 *    - Happy Clients YouTube Video Testimonials (.happy-clients-slider)
 * 2. Fancybox 5:
 *    - Gallery Lightbox ([data-fancybox="gallery"])
 *    - YouTube Video Testimonials ([data-fancybox="video-testimonials"])
 * 3. Sticky Header
 * 4. FAQ Accordion (Smooth slide toggle)
 * 5. Enquiry Modal (Open, Close, Product Auto-Selection, Form Validation)
 * 6. Scroll-To-Top Button
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. STICKY HEADER
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header-section');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 50) {
      if (header) header.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('is-visible');
    } else {
      if (header) header.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ------------------------------------------------------------------------
  // 2. SCROLL-TO-TOP BUTTON
  // ------------------------------------------------------------------------
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. FAQ ACCORDION
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close other open items in the same column
        const siblingItems = item.parentElement.querySelectorAll('.faq-item');
        siblingItems.forEach(function (sibling) {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const sibAnswer = sibling.querySelector('.faq-answer');
            if (sibAnswer && typeof $(sibAnswer).slideUp === 'function') {
              $(sibAnswer).slideUp(250);
            } else if (sibAnswer) {
              sibAnswer.style.display = 'none';
            }
          }
        });

        if (isActive) {
          item.classList.remove('active');
          if (typeof $(answer).slideUp === 'function') {
            $(answer).slideUp(250);
          } else {
            answer.style.display = 'none';
          }
        } else {
          item.classList.add('active');
          if (typeof $(answer).slideDown === 'function') {
            $(answer).slideDown(250);
          } else {
            answer.style.display = 'block';
          }
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 5. ENQUIRY MODAL (Popup)
  // ------------------------------------------------------------------------
  const modalBackdrop = document.querySelector('.enquiry-modal-backdrop');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-enquiry-modal');
  const productSelect = document.getElementById('enquiry-product');
  const enquiryForm = document.getElementById('enquiry-form');
  const feedbackToast = document.querySelector('.modal-feedback-toast');

  function openModal(productName) {
    if (modalBackdrop) {
      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (productSelect && productName) {
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value.toLowerCase() === productName.toLowerCase()) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      if (feedbackToast) feedbackToast.style.display = 'none';
    }
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || '';
      openModal(product);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';
      }

      // Simulate network response
      setTimeout(function () {
        if (feedbackToast) {
          feedbackToast.textContent = 'Thank you! Your enquiry has been received. Our executive will reach out to you shortly.';
          feedbackToast.style.display = 'block';
        }
        enquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Enquiry</span>';
        }
        setTimeout(closeModal, 2500);
      }, 700);
    });
  }

  // ------------------------------------------------------------------------
  // 6. FANCYBOX 5 (Gallery & YouTube Video Lightbox)
  // ------------------------------------------------------------------------
  if (typeof Fancybox !== 'undefined') {
    // Gallery Lightbox
    Fancybox.bind('[data-fancybox="gallery"]', {
      loop: true,
      Thumbs: {
        autoStart: true,
      },
    });

    // YouTube Video Testimonials Lightbox
    Fancybox.bind('[data-fancybox="video-testimonials"]', {
      Html: {
        youtube: {
          autoplay: 1,
          controls: 1,
          rel: 0,
        },
      },
    });
  }

  // ------------------------------------------------------------------------
  // 7. SLICK SLIDERS INITIALIZATION (JQUERY)
  // ------------------------------------------------------------------------
  if (typeof jQuery !== 'undefined' && typeof jQuery.fn.slick !== 'undefined') {
    const $ = jQuery;

    // SVG Icons for custom circular arrows matching Figma
    const prevArrowHtml = '<button type="button" class="slick-custom-arrow slick-prev-arrow" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>';
    const nextArrowHtml = '<button type="button" class="slick-custom-arrow slick-next-arrow" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>';

    // Hero Background Slider (Fixed text overlay, no arrows, only pagination dots)
    const $heroBgSlider = $('.hero-bg-slider');
    if ($heroBgSlider.length) {
      $heroBgSlider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        rows: 0,
        adaptiveHeight: false,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 900,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipe: true,
        touchMove: true
      });
    }

    // 0. Our Products Slider
    const $productsSlider = $('.products-slider');
    if ($productsSlider.length) {
      $productsSlider.slick({
        dots: false,
        arrows: true,
        prevArrow: prevArrowHtml,
        nextArrow: nextArrowHtml,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        pauseOnFocus: false,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3500,
              pauseOnHover: false,
              pauseOnFocus: false,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3500,
              pauseOnHover: false,
              pauseOnFocus: false,
              dots: false,
              arrows: true
            }
          }
        ]
      });
    }

    // 1. Why Choose Us Slider (Smooth Continuous Marquee Scroll)
    const $whyChooseSlider = $('.why-choose-slider');
    if ($whyChooseSlider.length) {
      $whyChooseSlider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 3000,
        cssEase: 'linear',
        pauseOnHover: true,
        pauseOnFocus: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        swipe: true,
        touchMove: true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 5,
              autoplay: true,
              autoplaySpeed: 0,
              dots: false,
              arrows: false
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              autoplay: true,
              autoplaySpeed: 0,
              dots: false,
              arrows: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              autoplay: true,
              autoplaySpeed: 0,
              pauseOnHover: false,
              pauseOnFocus: false,
              dots: false,
              arrows: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              autoplay: true,
              autoplaySpeed: 0,
              pauseOnHover: false,
              pauseOnFocus: false,
              dots: false,
              arrows: false
            }
          }
        ]
      });
    }

    // 2. What Our Customers Say Slider
    const $testimonialsSlider = $('.testimonials-slider');
    if ($testimonialsSlider.length) {
      $testimonialsSlider.slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: true,
        pauseOnFocus: false,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4500
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              pauseOnHover: false,
              pauseOnFocus: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              pauseOnHover: false,
              pauseOnFocus: false
            }
          }
        ]
      });
    }

    // 3. Happy Clients (YouTube Video Testimonials Slider)
    const $happyClientsSlider = $('.happy-clients-slider');
    if ($happyClientsSlider.length) {
      $happyClientsSlider.slick({
        dots: false,
        arrows: true,
        prevArrow: prevArrowHtml,
        nextArrow: nextArrowHtml,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3800,
        pauseOnHover: true,
        pauseOnFocus: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3800
            }
          },
          {
            breakpoint: 880,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3800
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3500,
              pauseOnHover: false,
              pauseOnFocus: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3500,
              pauseOnHover: false,
              pauseOnFocus: false
            }
          }
        ]
      });
    }
  }

});
