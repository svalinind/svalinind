/**
 * Template Name: Aiero | AI Agency & Technology HTML Template
 * Description: AI Agency, tech startup, chat bot, data science, digital agency, consulting, IT solutions, voiceover, video voiceover, robotics, science, industry, machine learning, neural network or other modern technology business template.
 * Version: 1.0.0
 * Author: ib-thems
 * Author https://themeforest.net/user/ib-themes
 */

(function ($) {
  "use strict";

  // ============================
  // Global Variables
  // ============================
  var $window = $(window);
  var $document = $(document);

  // ============================
  // Preloader
  // ============================
  var Preloader = {
    init: function () {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;

      const transitionDuration = 500; // ms
      const fallbackDelay = 3000; // ms

      const hidePreloader = () => {
        if (!preloader || preloader.dataset.hidden === "true") return;
        preloader.dataset.hidden = "true"; // prevent double calls
        preloader.style.transition = `opacity ${transitionDuration}ms ease`;
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, transitionDuration);
      };

      // Hide when the page fully loaded
      window.addEventListener("load", hidePreloader, { once: true });

      // Fallback in case some assets hang or slow CDN
      setTimeout(hidePreloader, fallbackDelay);
    },
  };

  // ============================
  // Side Menu (Primary)
  // ============================
  var SideMenu = {
    init: function () {
      var menuToggles = $(".menu-toggle");
      var sideMenu = $("#sideMenu");
      var closeMenuBtn = $("#closeBtn");
      var overlay = $("#overlay");

      if (
        menuToggles.length &&
        sideMenu.length &&
        closeMenuBtn.length &&
        overlay.length
      ) {
        menuToggles.on("click", function (e) {
          e.preventDefault();
          sideMenu.addClass("active");
          overlay.addClass("active");
        });

        closeMenuBtn.on("click", function () {
          sideMenu.removeClass("active");
          overlay.removeClass("active");
        });

        overlay.on("click", function () {
          sideMenu.removeClass("active");
          overlay.removeClass("active");
        });
      }

      // Sub-menu hover handling
      $(".sub-menu .sub-menu, .menu-style1 > ul > li .sub-menu").each(
        function () {
          var $this = $(this);
          var $parent = $this.parent();

          $parent.addClass("menu-has-items");

          $this.on("mouseenter", function () {
            $parent.addClass("active");
          });

          $this.on("mouseleave", function () {
            $parent.removeClass("active");
          });
        }
      );
    },
  };

  // ============================
  // Side Menu 2 (Multi Menu)
  // ============================
  var SideMenu2 = {
    init: function () {
      var overlay2 = $(".overlay2");
      var toggles = $(".hamburger.popup-menu");
      var sideMenus = $(".side-menu2");
      var closeBtns = $(".side-menu2 .close-btn");

      if (toggles.length && overlay2.length) {
        // Open menu
        toggles.on("click", function () {
          var menuName = $(this).data("menu");
          var menu = $('.side-menu2[data-menu="' + menuName + '"]');

          if (menu.length) {
            menu.addClass("active");
            overlay2.addClass("active");
          }
        });

        // Close menu via close button
        closeBtns.on("click", function () {
          var menu = $(this).closest(".side-menu2");
          menu.removeClass("active");
          overlay2.removeClass("active");
          menu.find(".active").removeClass("active");
        });

        // Close menu via overlay
        overlay2.on("click", function () {
          sideMenus.removeClass("active");
          sideMenus.find(".active").removeClass("active");
          overlay2.removeClass("active");
        });

        // Toggle sub-menus
        $(".menu-left li > a").on("click", function (e) {
          var $parentLi = $(this).parent();
          var $subMenu = $parentLi.children("ul");

          if ($subMenu.length) {
            e.preventDefault();

            // Toggle inner menu
            $subMenu.toggleClass("active");

            // Toggle active class on parent <li>
            $parentLi.toggleClass("active");
          }
        });

        // Side menu list item toggle
        $(".side-menu2 > ul > li").on("click", function () {
          $(this).toggleClass("active");
        });

        $(".side-menu2 .sub-menu").on("click", function (e) {
          e.stopPropagation();
          $(this).toggleClass("active");
        });
      }
    },
  };

  // ============================
  // Side Menu 3 (Mobile Menu)
  // ============================
  var SideMenu3 = {
    init: function () {
      var overlay3 = $(".overlay3");
      var toggles3 = $(".hamburger3");
      var sideMenu3 = $(".side-menu3");
      var closeBtn3 = $(".side-menu3 .close-btn");

      if (
        overlay3.length &&
        toggles3.length &&
        sideMenu3.length &&
        closeBtn3.length
      ) {
        // Submenu toggle with parent <li> active
        sideMenu3.find(".menu-left ul li > a").on("click", function (e) {
          var $parentLi = $(this).parent();
          var $subMenu = $parentLi.children("ul");

          if ($subMenu.length) {
            e.preventDefault();

            // Toggle submenu
            $subMenu.toggleClass("active");

            // Toggle active class on parent <li>
            $parentLi.toggleClass("active");
          }
        });

        // Open side menu
        toggles3.on("click", function () {
          sideMenu3.addClass("active");
          overlay3.addClass("active");
        });

        // Close side menu
        function closeMenu() {
          sideMenu3.removeClass("active");
          overlay3.removeClass("active");

          // Remove all submenu active classes and li active classes
          sideMenu3.find(".menu-left ul li ul").removeClass("active");
          sideMenu3.find(".menu-left ul li").removeClass("active");
        }

        closeBtn3.on("click", closeMenu);
        overlay3.on("click", closeMenu);
      }
    },
  };

  // ============================
  // Sidebar Toggle (2 & 3)
  // ============================
  var SidebarToggle = {
    init: function () {
      // Sidebar 2
      this.initSidebar(
        ".side-bar2",
        ".sidebar-toggle",
        ".sidebar-close",
        ".sidebar-overlay"
      );

      // Sidebar 3
      this.initSidebar(
        ".side-bar3",
        ".sidebar-toggle3",
        ".sidebar-close3",
        ".sidebar-overlay3"
      );
    },

    initSidebar: function (
      sidebarClass,
      toggleClass,
      closeClass,
      overlayClass
    ) {
      var sidebar = $(sidebarClass);
      var toggleBtn = $(toggleClass);
      var closeBtn = $(closeClass);
      var overlay = $(overlayClass);

      if (
        toggleBtn.length &&
        sidebar.length &&
        closeBtn.length &&
        overlay.length
      ) {
        toggleBtn.on("click", function () {
          sidebar.addClass("active");
          overlay.addClass("active");
        });

        closeBtn.on("click", function () {
          sidebar.removeClass("active");
          overlay.removeClass("active");
        });

        overlay.on("click", function () {
          sidebar.removeClass("active");
          overlay.removeClass("active");
        });
      }
    },
  };

  // ============================
  // Video Modal
  // ============================
  var VideoModal = {
    init: function () {
      const videoBtns = document.querySelectorAll(".video-popup");

      if (!videoBtns.length) return;

      videoBtns.forEach((btn) => {
        this.bindEvents(btn);
      });

      // Global ESC key handler
      this.initEscapeKey();
    },

    bindEvents: function (btn) {
      const videoModal = document.querySelector(".video-modal");

      if (!videoModal) return;

      const popupVideo = videoModal.querySelector("iframe");
      const closeVideoBtn = videoModal.querySelector(".close-btn");

      // Open modal
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal(btn, videoModal, popupVideo);
      });

      // Close via button
      if (closeVideoBtn) {
        closeVideoBtn.addEventListener("click", () => {
          this.closeModal(videoModal, popupVideo);
        });
      }

      // Close via overlay click
      videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
          this.closeModal(videoModal, popupVideo);
        }
      });
    },

    openModal: function (btn, modal, video) {
      const videoUrl = btn.getAttribute("data-video");
      video.src = videoUrl + "?autoplay=1";
      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("show"), 10);
    },

    closeModal: function (modal, video) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        video.src = "";
      }, 300);
    },

    initEscapeKey: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const videoModal = document.querySelector(".video-modal");
          const popupVideo = videoModal?.querySelector("iframe");

          if (videoModal && videoModal.classList.contains("show")) {
            this.closeModal(videoModal, popupVideo);
          }
        }
      });
    },
  };

  // ============================
  // Sticky Header
  // ============================
  var StickyHeader = {
    init: function () {
      var header = $(".sticky-active");
      var $window = $(window);

      if (header.length) {
        $window.on("scroll", function () {
          if ($window.scrollTop() > 100) {
            header.addClass("is-sticky");
          } else {
            header.removeClass("is-sticky");
          }
        });
      }
    },
  };

  // ============================
  // Counter Animation
  // ============================
  var CounterAnimation = {
    init: function () {
      var counters = $(".counter-number");

      if (counters.length && typeof IntersectionObserver !== "undefined") {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                CounterAnimation.animate(entry.target);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );

        counters.each(function () {
          observer.observe(this);
        });
      }
    },

    formatNumber: function (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    animate: function (counter) {
      var $counter = $(counter);
      var target = parseFloat($counter.data("target"));
      var count = 0;
      var duration = 6000;
      var startTime = performance.now();
      var isDecimal = $counter.hasClass("percent-counter3");

      function update(currentTime) {
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        count = target * progress;

        if (isDecimal) {
          $counter.text(count.toFixed(1));
        } else {
          $counter.text(CounterAnimation.formatNumber(Math.ceil(count)));
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            $counter.text(target.toFixed(1));
          } else {
            $counter.text(CounterAnimation.formatNumber(target));
          }
        }
      }
      requestAnimationFrame(update);
    },
  };

  // ============================
  // Search Popup
  // ============================
  var SearchPopup = {
    init: function () {
      $(".popup-search").on("click", function (e) {
        e.preventDefault();
        var popupId = $(this).data("popup");
        var popup = $('.search-popup[data-popup="' + popupId + '"]');
        if (popup.length) {
          popup.addClass("active");
        }
      });

      $(".search-popup").each(function () {
        var popup = $(this);
        var closeBtn = popup.find(".close-popup");
        var content = popup.find(".search-popup-content");

        closeBtn.on("click", function () {
          popup.removeClass("active");
        });

        popup.on("click", function () {
          popup.removeClass("active");
        });

        content.on("click", function (e) {
          e.stopPropagation();
        });
      });
    },
  };

  // ============================
  // Scroll To Top Button
  // ============================
  var ScrollToTop = {
    init: function () {
      var scrollBtn = $("#scrollBtn");
      if (scrollBtn.length) {
        $window.on("scroll", function () {
          if ($window.scrollTop() > 200) {
            scrollBtn.css("display", "block");
          } else {
            scrollBtn.css("display", "none");
          }
        });

        scrollBtn.on("click", function () {
          $("html, body").animate({ scrollTop: 0 }, 600);
        });
      }
    },
  };

  // ============================
  // Horizontal Scroll Slider
  // ============================
  var HorizontalScroll = {
    init: function () {
      var section = $(".project-sec3");
      if (!section.length) return;

      var track = section.find(".project-track");
      var currentX = 0;
      var velocity = 0;
      var lastScroll = $window.scrollTop();

      // Duplicate content for infinite loop
      track.html(track.html() + track.html());
      var totalWidth = track[0].scrollWidth / 2;

      $window.on("resize", function () {
        totalWidth = track[0].scrollWidth / 2;
      });

      function animate() {
        currentX += velocity;

        if (currentX <= -totalWidth) currentX = 0;
        if (currentX >= 0) currentX = -totalWidth;

        track.css("transform", "translateX(" + currentX + "px)");
        velocity *= 0.9;

        requestAnimationFrame(animate);
      }
      animate();

      $window.on("scroll", function () {
        var rect = section[0].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var currentScroll = $window.scrollTop();
          if (currentScroll > lastScroll) {
            velocity = -5;
          } else {
            velocity = 5;
          }
          lastScroll = currentScroll;
        }
      });
    },
  };

  // ============================
  // Price Range Filter
  // ============================
  var PriceFilter = {
    init: function () {
      var minInput = $("#min");
      var maxInput = $("#max");
      var minValue = $("#min-value");
      var maxValue = $("#max-value");
      var sliderTrack = $(".slider-track");

      if (
        minInput.length &&
        maxInput.length &&
        minValue.length &&
        maxValue.length &&
        sliderTrack.length
      ) {
        var sliderMaxValue = Number(maxInput.attr("max"));

        function fillColor() {
          var percent1 = (Number(minInput.val()) / sliderMaxValue) * 100;
          var percent2 = (Number(maxInput.val()) / sliderMaxValue) * 100;
          sliderTrack.css({
            left: percent1 + "%",
            width: percent2 - percent1 + "%",
          });
          minValue.text("$" + minInput.val());
          maxValue.text("$" + maxInput.val());
        }

        minInput.on("input", fillColor);
        maxInput.on("input", fillColor);
        fillColor();
      }
    },
  };

  // ============================
  // Quantity Filter
  // ============================
  window.changeQty = function (id, change) {
    var input = $("#" + id);
    if (!input.length) return;

    var newVal = parseInt(input.val()) + change;
    var min = parseInt(input.attr("min")) || 0;
    var max = parseInt(input.attr("max")) || 999;

    if (newVal >= min && newVal <= max) {
      input.val(newVal);
    }
  };

  window.applyQtyFilter = function () {
    var minInput = $("#minQty");
    var maxInput = $("#maxQty");

    var minQty = minInput.length ? minInput.val() : 0;
    var maxQty = maxInput.length ? maxInput.val() : 0;

    console.log("Filter applied:", minQty, "-", maxQty);
  };

  // ============================
  // Active Menu Item
  // ============================
  var ActiveMenu = {
    init: function () {
      var currentPage = window.location.pathname.split("/").pop();

      function setActive(menuLi) {
        var links = menuLi.find("a");
        var found = false;

        links.each(function () {
          var linkPage = $(this).attr("href").split("/").pop();
          if (linkPage === currentPage) {
            $(this).addClass("active");
            found = true;
          }
        });

        var childLis = menuLi.find("li");
        childLis.each(function () {
          if (setActive($(this))) {
            found = true;
          }
        });

        if (found) {
          var topLink = menuLi.children("a");
          if (topLink.length) topLink.addClass("active");
          menuLi.addClass("active");
        } else {
          var topLink = menuLi.children("a");
          if (topLink.length) topLink.removeClass("active");
          menuLi.removeClass("active");
        }

        return found;
      }

      // ✅ Desktop Menu
      var topMenuItems = $(".menu-style1 > ul > li");
      topMenuItems.each(function () {
        setActive($(this));
      });

      // ✅ Mobile / Side Menu (Added Line)
      var mobileMenuItems = $(".side-menu2 > ul > li");
      mobileMenuItems.each(function () {
        setActive($(this));
      });
    },
  };

  // ============================
  // GSAP Animations
  // ============================
  var GsapAnimations = {
    init: function () {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
        return;

      gsap.registerPlugin(ScrollTrigger);

      this.animateSubtitles();
      this.animateHeadings();
      this.initHeroSlider();
      this.animateContactButtons();
      this.animateDemoImages();
      this.animateSection24();
      this.animateServiceCards();
    },

    animateSubtitles: function () {
      $(".sec-title .sub-title").each(function () {
        var sub = $(this);
        var text = sub.text().trim();
        sub.html('<span class="sub-text">' + text + "</span>");
        var innerSpan = sub.find(".sub-text");

        gsap.set(innerSpan, {
          width: 1,
          display: "inline-block",
          overflow: "hidden",
        });

        gsap.to(innerSpan, {
          width: innerSpan[0].scrollWidth,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sub.closest(".sec-title"),
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },

    animateHeadings: function () {
      $(".title.animated-heading").each(function () {
        var title = $(this);
        var words = title.text().trim().split(/\s+/);

        var wrappedWords = words
          .map(function (word) {
            var letters = word
              .split("")
              .map(function (l) {
                return '<span class="letter">' + l + "</span>";
              })
              .join("");
            return '<span class="word">' + letters + "</span>";
          })
          .join('<span class="space"> </span>');

        title.html(wrappedWords);

        gsap.from(title.find(".letter"), {
          y: 40,
          opacity: 0,
          stagger: 0.04, // slower letter reveal
          duration: 0.9, // smoother
          ease: "power3.out",
          delay: 0.3, // waits until preloader ends
          scrollTrigger: {
            trigger: title,
            start: "top 85%", // fires a bit later
            once: true, // plays only once
          },
        });
      });
    },

    initHeroSlider: function () {
      if (typeof Swiper === "undefined") return;

      var heroSwiper = new Swiper(".hero-slider2", {
        loop: true,
        effect: "fade",
        speed: 800,
        fadeEffect: { crossFade: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {
            GsapAnimations.animateSlide(this.slides[this.activeIndex]);
          },
          slideChange: function () {
            GsapAnimations.animateSlide(this.slides[this.activeIndex]);
          },
        },
      });
    },

    animateSlide: function (slide) {
      if (!slide) return;

      gsap.set(slide, { visibility: "visible" });

      var elements = $(slide).find(".title, .hero-btn2 p, .ibt-btn, .exp-box");
      gsap.set(elements, { y: 50, opacity: 0 });

      var tl = gsap.timeline();
      var title = $(slide).find(".title");
      var paragraph = $(slide).find(".hero-btn2 p");
      var btn = $(slide).find(".ibt-btn");
      var expBox = $(slide).find(".exp-box");

      if (title.length)
        tl.to(title, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
      if (paragraph.length)
        tl.to(
          paragraph,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        );
      if (btn.length)
        tl.to(
          btn,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        );
      if (expBox.length)
        tl.to(
          expBox,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    },

    animateContactButtons: function () {
      var buttons = $(".contact-btn");
      buttons.each(function () {
        var btn = $(this);
        var text = btn.find(".text");
        var outer = btn.find(".border-outer");
        var inner = btn.find(".border-inner");
        var moveTimeout;

        btn.on("mousemove", function (e) {
          clearTimeout(moveTimeout);

          var rect = btn[0].getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;

          gsap.to(inner, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.08,
            ease: "power2.out",
          });

          gsap.to(outer, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(text, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.2,
            ease: "power2.out",
          });

          moveTimeout = setTimeout(function () {
            gsap.to([inner, outer], {
              x: x * 0.1,
              y: y * 0.1,
              duration: 0.2,
              ease: "power2.out",
            });
            gsap.to(text, {
              x: x * 0.1,
              y: y * 0.1,
              duration: 0.25,
              ease: "power2.out",
            });
          }, 100);
        });

        btn.on("mouseleave", function () {
          clearTimeout(moveTimeout);
          gsap.to([inner, outer, text], {
            x: 0,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        });
      });
    },

    animateDemoImages: function () {
      var demoImgs = document.querySelectorAll(".demo-img, .ser-anim");

      if (!demoImgs.length) return;

      gsap.utils.toArray(demoImgs).forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.03,
            scrollTrigger: {
              trigger: img,
              start: "top 95%",
              end: "bottom 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    },

    animateServiceCards: function () {
      var serviceCards = document.querySelectorAll(
        ".ser-card14-card1, .ser-card14-card2, .ser-card14-card3, .ser-card14-card4, .ser-card14-card5"
      );

      if (!serviceCards.length) return;

      gsap.utils.toArray(serviceCards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 80%",
              toggleActions: "play none none none",
              once: true, // ek hi baar play hoga
            },
          }
        );
      });
    },

    animateSection24: function () {
      if ($(".funfact-content24").length) {
        gsap.from(".funfact-content24", {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".funfact-content24",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      // Check if .ser-content24 exists
      if ($(".ser-content24").length) {
        gsap.from(".ser-content24", {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ser-content24",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    },
  };

  // ============================
  // Swiper Sliders
  // ============================
  var SwiperSliders = {
    init: function () {
      if (typeof Swiper === "undefined") return;

      // Brand Slider
      if ($(".brand").length) {
        new Swiper(".brand", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 4,
          spaceBetween: 20,
          breakpoints: {
            1920: { slidesPerView: 4, spaceBetween: 30 },
            1440: { slidesPerView: 4, spaceBetween: 30 },
            1366: { slidesPerView: 4, spaceBetween: 30 },
            1201: { slidesPerView: 4, spaceBetween: 30 },
            769: { slidesPerView: 3, spaceBetween: 30 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            375: { slidesPerView: 2, spaceBetween: 20 },
          },
        });
      }

      // Brand Slider
      if ($(".pro7").length) {
        new Swiper(".pro7", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 2,
          spaceBetween: 20,
          breakpoints: {
            1920: { slidesPerView: 2, spaceBetween: 30 },
            1440: { slidesPerView: 2, spaceBetween: 30 },
            1366: { slidesPerView: 2, spaceBetween: 30 },
            1201: { slidesPerView: 2, spaceBetween: 30 },
            769: { slidesPerView: 1, spaceBetween: 30 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            375: { slidesPerView: 1, spaceBetween: 20 },
          },
        });
      }

      // Brand Slider 2
      if ($(".brand2").length) {
        new Swiper(".brand2", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          navigation: { nextEl: ".brand-next", prevEl: ".brand-prev" },
          slidesPerView: 6,
          spaceBetween: 20,
          breakpoints: {
            1920: { slidesPerView: 6, spaceBetween: 30 },
            1201: { slidesPerView: 5, spaceBetween: 30 },
            1025: { slidesPerView: 4, spaceBetween: 30 },
            769: { slidesPerView: 3, spaceBetween: 30 },
            577: { slidesPerView: 2, spaceBetween: 30 },
            480: { slidesPerView: 2, spaceBetween: 30 },
            375: { slidesPerView: 2, spaceBetween: 30 },
          },
        });
      }

      // Choose Slider 2
      if ($(".choose-slider2").length) {
        new Swiper(".choose-slider2", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 3,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1440: { slidesPerView: 3, spaceBetween: 30 },
            1366: { slidesPerView: 3, spaceBetween: 30 },
            1201: { slidesPerView: 3, spaceBetween: 30 },
            1025: { slidesPerView: 2, spaceBetween: 30 },
            769: { slidesPerView: 2, spaceBetween: 30 },
            577: { slidesPerView: 1, spaceBetween: 30 },
            480: { slidesPerView: 1, spaceBetween: 30 },
            375: { slidesPerView: 1, spaceBetween: 30 },
          },
        });
      }

      if ($(".project-slider10").length) {
        new Swiper(".project-slider10", {
          loop: true,
          // autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 4.5,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1440: { slidesPerView: 4.5, spaceBetween: 30 },
            1366: { slidesPerView: 4.5, spaceBetween: 30 },
            1201: { slidesPerView: 4.5, spaceBetween: 30 },
            1025: { slidesPerView: 3.5, spaceBetween: 30 },
            769: { slidesPerView: 2.4, spaceBetween: 30 },
            577: { slidesPerView: 2.3, spaceBetween: 20 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            375: { slidesPerView: 1, spaceBetween: 20 },
          },
        });
      }

      // Choose Slider 4
      if ($(".choose-slider4").length) {
        new Swiper(".choose-slider4", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 4,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1440: { slidesPerView: 4, spaceBetween: 0 },
            1366: { slidesPerView: 3, spaceBetween: 0 },
            1201: { slidesPerView: 3, spaceBetween: 0 },
            1025: { slidesPerView: 3, spaceBetween: 0 },
            769: { slidesPerView: 2, spaceBetween: 0 },
            577: { slidesPerView: 2, spaceBetween: 0 },
            480: { slidesPerView: 1, spaceBetween: 0 },
            375: { slidesPerView: 1, spaceBetween: 0 },
          },
        });
      }

      // Choose Slider 4
      if ($(".testi-slide5").length) {
        new Swiper(".testi-slide5", {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: 4,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1440: { slidesPerView: 4, spaceBetween: 40 },
            1366: { slidesPerView: 3, spaceBetween: 20 },
            1201: { slidesPerView: 3, spaceBetween: 20 },
            1025: { slidesPerView: 2, spaceBetween: 20 },
            769: { slidesPerView: 2, spaceBetween: 20 },
            577: { slidesPerView: 2, spaceBetween: 20 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            375: { slidesPerView: 1, spaceBetween: 20 },
          },
        });
      }

      // Project Slider
      if ($(".project-slider").length) {
        var projectSwiper = new Swiper(".project-slider", {
          loop: true,
          slidesPerView: 4,
          spaceBetween: 0,
          autoplay: { delay: 3000, disableOnInteraction: false },
          breakpoints: {
            1920: { slidesPerView: 4 },
            1440: { slidesPerView: 4 },
            1366: { slidesPerView: 3 },
            1201: { slidesPerView: 3 },
            769: { slidesPerView: 2 },
            577: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            375: { slidesPerView: 1 },
          },
          on: {
            init: function () {
              SwiperSliders.createCustomDots(this);
              SwiperSliders.updateDots(this.realIndex);
            },
            slideChangeTransitionEnd: function () {
              SwiperSliders.updateDots(this.realIndex);
            },
            slidesLengthChange: function () {
              SwiperSliders.updateDots(this.realIndex);
            },
          },
        });
      }

      // Project Slider 4
      if ($(".project-slider4").length) {
        new Swiper(".project-slider4", {
          loop: true,
          slidesPerView: 4,
          spaceBetween: 20,
          autoplay: { delay: 3000, disableOnInteraction: false },
          navigation: {
            nextEl: ".slider-btn4 .swiper-button-next",
            prevEl: ".slider-btn4 .swiper-button-prev",
          },
          breakpoints: {
            1920: { slidesPerView: 4 },
            1440: { slidesPerView: 4 },
            1366: { slidesPerView: 3 },
            1201: { slidesPerView: 3 },
            769: { slidesPerView: 2 },
            577: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            375: { slidesPerView: 1 },
          },
        });
      }

      // Service Slider 15
      if ($(".ser-slider15").length) {
        new Swiper(".ser-slider15", {
          loop: true,
          slidesPerView: 4.3,
          spaceBetween: 20,
          autoplay: { delay: 3000, disableOnInteraction: false },
          navigation: {
            nextEl: ".slider-btn5 .swiper-button-next",
            prevEl: ".slider-btn5 .swiper-button-prev",
          },
          breakpoints: {
            1920: { slidesPerView: 4.3 },
            1440: { slidesPerView: 4.3 },
            1366: { slidesPerView: 3.3 },
            1201: { slidesPerView: 3.3 },
            769: { slidesPerView: 2.3 },
            577: { slidesPerView: 1.3 },
            480: { slidesPerView: 1.3 },
            375: { slidesPerView: 1.2 },
          },
        });
      }

      // Testimonial Slider
      if ($(".testi-slider").length) {
        new Swiper(".testi-slider", {
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          slidesPerView: 1,
          spaceBetween: 200,
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }

      // Testimonial Slider4
      if ($(".testi-slider4").length) {
        new Swiper(".testi-slider4", {
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          slidesPerView: 1,
          spaceBetween: 200,
          pagination: { el: ".swiper-pagination", clickable: true },
          on: {
            init: function () {
              SwiperSliders.createCustomDots(this);
              SwiperSliders.updateDots(this.realIndex);
            },
            slideChangeTransitionEnd: function () {
              SwiperSliders.updateDots(this.realIndex);
            },
            slidesLengthChange: function () {
              SwiperSliders.updateDots(this.realIndex);
            },
          },
        });
      }
    },

    createCustomDots: function (swiper) {
      var container = $(".custom-pagination");
      if (!container.length) return;

      container.html("");
      for (var i = 0; i < 3; i++) {
        container.append(
          '<span class="custom-dot" data-index="' + i + '"></span>'
        );
      }

      $(".custom-dot").on("click", function () {
        var index = parseInt($(this).data("index"));
        swiper.slideToLoop(index, 600);
      });
    },

    updateDots: function (realIndex) {
      var dots = $(".custom-dot");
      dots.removeClass("active");
      var activeDot = realIndex % 3;
      dots.eq(activeDot).addClass("active");
    },
  };

  // ============================
  // Light Gallery
  // ============================
  var LightGalleryInit = {
    init: function () {
      if (typeof lightGallery === "undefined") return;

      // Light Gallery 1
      var lg1 = document.getElementById("lightgallery");
      if (lg1) {
        lightGallery(lg1, {
          selector: ".project-block7",
          plugins: [lgZoom, lgThumbnail],
          speed: 500,
          thumbnail: true,
          licenseKey: "your-license-key",
        });
      }

      // Light Gallery 2
      var lg2 = document.getElementById("lightgallery2");
      if (lg2) {
        lightGallery(lg2, {
          selector: ".isotope-item",
          plugins: [lgZoom, lgThumbnail],
          speed: 500,
          thumbnail: true,
          licenseKey: "your-license-key",
        });
      }

      // Light Gallery 3
      var lg3 = document.getElementById("lightgallery3");
      if (lg3) {
        lightGallery(lg3, {
          selector: ".project-block7",
          plugins: [lgZoom, lgThumbnail],
          speed: 500,
          thumbnail: true,
          licenseKey: "your-license-key",
        });
      }
    },
  };

  // ============================
  // Isotope Filter
  // ============================
  var IsotopeFilter = {
    init: function () {
      if (typeof $.fn.isotope === "undefined") return;

      // Isotope with Masonry Layout
      var $grid = $(".iso-container");
      if ($grid.length) {
        $grid.isotope({
          itemSelector: ".isotope-item",
          percentPosition: true,
          masonry: {
            columnWidth: ".grid-sizer",
          },
        });

        // Fix overlapping after images load
        $grid.imagesLoaded().progress(function () {
          $grid.isotope("layout");
        });

        // Filter buttons
        $("#custom-filter a").on("click", function (e) {
          e.preventDefault();
          $("#custom-filter a").removeClass("active");
          $(this).addClass("active");
          var filterValue = $(this).attr("data-filter");
          $grid.isotope({ filter: filterValue });
        });
      }

      // Isotope Container 2 (Fit Rows)
      var $grid2 = $(".iso-container2");
      if ($grid2.length) {
        $grid2.isotope({
          filter: "*",
          transitionDuration: "0.7s",
          animationOptions: {
            duration: 750,
            queue: false,
          },
          layoutMode: "fitRows",
          fitRows: {
            gutter: 0,
          },
        });

        $("#custom-filter li:first-child > a").addClass("is-checked");

        $("#custom-filter a").on("click", function (e) {
          e.preventDefault();
          $("#custom-filter .is-checked").removeClass("is-checked");
          $(this).addClass("is-checked");

          var customSelector = $(this).attr("data-filter");
          $grid2.isotope({
            filter: customSelector,
            transitionDuration: "0.7s",
            animationOptions: {
              duration: 750,
              queue: false,
            },
            layoutMode: "fitRows",
            fitRows: {
              gutter: 0,
            },
          });
        });
      }
    },
  };

  // ============================
  // Custom Cursor
  // ============================
  var AieroEffects = {
    init: function () {
      var customCursor = $(".custom-cursor");
      var cursorBlocks = $(
        ".project-block8, .project-block7, .project-img10, .test-block5"
      ); // custom cursor only

      if (customCursor.length && cursorBlocks.length) {
        $("body").append(customCursor);
        customCursor.css({
          position: "fixed",
          top: "0px",
          left: "0px",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0)",
          transition: "transform 0.15s ease, opacity 0.2s ease",
        });

        let isDragging = false;

        // ===== Demo Hover Boxes =====
        const demoImgs = document.querySelectorAll(".demo-img");
        demoImgs.forEach((img) => {
          const hoverBox = img.querySelector(".demo-hover");
          document.body.appendChild(hoverBox); // fixed position ke liye

          // Mouse move ke sath hover box follow kare
          img.addEventListener("mousemove", (e) => {
            hoverBox.style.left = e.clientX + 10 + "px";
            hoverBox.style.top = e.clientY + 10 + "px";
          });

          // Hover show/hide sirf apne parent block me
          img.addEventListener("mouseenter", () =>
            hoverBox.classList.add("show")
          );
          img.addEventListener("mouseleave", () =>
            hoverBox.classList.remove("show")
          );
        });

        // ===== Custom Cursor =====
        cursorBlocks.on("mouseenter", function () {
          customCursor.css({
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          });
        });

        cursorBlocks.on("mouseleave", function () {
          customCursor.css({
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0)",
          });
        });

        // Global cursor movement
        $(document).on("mousemove", function (e) {
          customCursor.css({
            top: e.clientY + "px",
            left: e.clientX + "px",
          });
        });

        // Drag states
        $(document).on("mousedown", function () {
          isDragging = true;
          customCursor.addClass("dragging");
        });
        $(document).on("mouseup", function () {
          isDragging = false;
          customCursor.removeClass("dragging");
        });

        // Swiper Sync Fix
        if (typeof Swiper !== "undefined") {
          document.querySelectorAll(".swiper").forEach(function (el) {
            const swiperInstance = el.swiper;
            if (swiperInstance) {
              swiperInstance.on("touchMove", function (swiper, e) {
                if (e && e.clientX && e.clientY) {
                  customCursor.css({
                    top: e.clientY + "px",
                    left: e.clientX + "px",
                  });
                }
              });
              swiperInstance.on("touchStart", function () {
                customCursor.addClass("dragging");
              });
              swiperInstance.on("touchEnd", function () {
                customCursor.removeClass("dragging");
              });
            }
          });
        }
      }
    },
  };

  // ============================
  // Body Active mode
  // ============================
  var ThemeToggle = {
    init: function () {
      var body = document.body;
      var themeBtn = document.getElementById("themeBtn");
      var darkModeImages = document.querySelectorAll(
        ".darkModeTrigger, .darkModeTriggerImg, .darkModeTriggerImg2"
      );

      // ✅ Apply stored preferences on page load
      if (localStorage.getItem("themeMode") === "active") {
        body.classList.add("active-body", "dark-mode");
        if (themeBtn) themeBtn.classList.add("active-btn");
      }

      // ✅ Button toggle without refresh
      if (themeBtn) {
        themeBtn.addEventListener("click", function () {
          toggleDarkMode();
        });
      }

      // ✅ Image toggle without refresh
      darkModeImages.forEach(function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault(); // prevent redirect
          toggleDarkMode();
        });
      });

      // ✅ Toggle function WITHOUT refresh
      function toggleDarkMode() {
        if (!body.classList.contains("active-body")) {
          // Turn ON
          body.classList.add("active-body", "dark-mode");
          if (themeBtn) themeBtn.classList.add("active-btn");
          localStorage.setItem("themeMode", "active");
          localStorage.setItem("darkMode", "enabled");
        } else {
          // Turn OFF
          body.classList.remove("active-body", "dark-mode");
          if (themeBtn) themeBtn.classList.remove("active-btn");
          localStorage.setItem("themeMode", "inactive");
          localStorage.setItem("darkMode", "disabled");
        }
      }
    },
  };

  // ============================
  // Parallax Efect
  // ============================
  var AieroParallax = {
    init: function () {
      const parallaxSections = document.querySelectorAll(
        ".contact-banner3, .newsletter-banner, .video-banner4"
      );
      if (!parallaxSections.length) return;

      const speed = 0.2;

      function handleScroll() {
        const scrollTop = window.scrollY || window.pageYOffset;

        parallaxSections.forEach((section) => {
          const img = section.querySelector(".parallax-img");
          if (!img) return;

          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const distance = scrollTop - sectionTop;

          // Move only while section is visible
          if (distance >= -window.innerHeight && distance <= sectionHeight) {
            img.style.transform = `translateY(${distance * speed}px)`;
          }
        });
      }

      window.addEventListener("scroll", handleScroll);
      handleScroll();
    },
  };

  // ============================
  // OGLDeformEffect
  // ============================
  var OGLDeformEffect = {
    init: function (selector, imagePath) {
      const section = document.querySelector(selector);
      if (!section) return;

      // Always show the image as background for mobile
      section.style.backgroundImage = `url(${imagePath})`;
      section.style.backgroundSize = "cover";
      section.style.backgroundPosition = "center";

      // Check viewport width - disable effect on mobile (768px and below)

      if (window.innerWidth <= 768) {
        // Mobile: Show image with custom CSS
        section.style.backgroundImage = `url(${imagePath})`;
        section.style.backgroundSize = "auto";
        section.style.backgroundPosition = "center -156px";
        section.style.backgroundRepeat = "no-repeat";
        return; // Exit early on mobile devices
      }

      import("https://cdn.skypack.dev/ogl").then(
        ({ Renderer, Geometry, Program, Mesh, Texture, Flowmap, Vec2 }) => {
          // Create canvas
          const canvas = document.createElement("canvas");
          canvas.classList.add("fluid-canvas");
          canvas.style.position = "absolute";
          canvas.style.top = 0;
          canvas.style.left = 0;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.borderRadius = "inherit";
          canvas.style.pointerEvents = "none"; // so it doesn't block hover
          section.style.position = "relative";
          section.prepend(canvas);

          const renderer = new Renderer({ dpr: 2, canvas });
          const gl = renderer.gl;
          renderer.setSize(section.clientWidth, section.clientHeight);
          gl.clearColor(0, 0, 0, 0);

          const vertex = `
          attribute vec2 uv;
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = vec4(position, 0, 1);
          }`;

          const fragment = `
          precision highp float;
          uniform sampler2D tWater;
          uniform sampler2D tFlow;
          varying vec2 vUv;
          void main() {
              vec3 flow = texture2D(tFlow, vUv).rgb;
              vec2 uv = vUv - flow.xy * 0.08;
              vec3 color = texture2D(tWater, uv).rgb;
              gl_FragColor = vec4(color, 1.0);
          }`;

          const geometry = new Geometry(gl, {
            position: {
              size: 2,
              data: new Float32Array([-1, -1, 3, -1, -1, 3]),
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
          });

          const texture = new Texture(gl);
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = imagePath;
          img.onload = () => (texture.image = img);

          const flowmap = new Flowmap(gl, {
            falloff: 0.35,
            alpha: 1,
            dissipation: 0.95,
          });

          const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
              tWater: { value: texture },
              tFlow: flowmap.uniform,
            },
          });

          const mesh = new Mesh(gl, { geometry, program });

          const mouse = new Vec2(-1);
          const velocity = new Vec2();
          const lastMouse = new Vec2();
          let lastTime;
          let isMoving = false;
          let idleTimeout;

          section.addEventListener("mousemove", function (e) {
            updateMouse(e);
            isMoving = true;
            clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => (isMoving = false), 100);
          });

          section.addEventListener("mouseleave", function () {
            mouse.set(-1);
            velocity.set(0);
            isMoving = false;
          });

          function updateMouse(e) {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mouse.set(x / rect.width, 1.0 - y / rect.height);

            if (!lastTime) {
              lastTime = performance.now();
              lastMouse.set(x, y);
            }

            const deltaX = x - lastMouse.x;
            const deltaY = y - lastMouse.y;
            lastMouse.set(x, y);

            const time = performance.now();
            const delta = Math.max(16, time - lastTime);
            lastTime = time;

            velocity.x = deltaX / delta;
            velocity.y = deltaY / delta;
          }

          // Handle window resize
          window.addEventListener("resize", function () {
            if (window.innerWidth <= 768) {
              // Show background image and remove canvas on mobile
              section.style.backgroundImage = `url(${imagePath})`;
              canvas.remove();
              return;
            }
            renderer.setSize(section.clientWidth, section.clientHeight);
          });

          function update() {
            requestAnimationFrame(update);
            if (!isMoving) {
              velocity.x *= 0.9;
              velocity.y *= 0.9;
            }
            flowmap.mouse.copy(mouse);
            flowmap.velocity.lerp(velocity, 0.15);
            flowmap.update();
            renderer.render({ scene: mesh });
          }
          update();
        }
      );
    },
  };

  var SignupToggle = {
    init: function () {
      var signupLink = document.getElementById("signupLink");
      var customForm = document.getElementById("custom-form4");

      if (!signupLink || !customForm) return;

      signupLink.addEventListener("click", function (e) {
        e.preventDefault();
        customForm.classList.toggle("active");

        if (customForm.classList.contains("active")) {
          signupLink.textContent = "Back to Sign in";
        } else {
          signupLink.textContent = "Sign up";
        }
      });
    },
  };

  // ============================
  // hide and show
  // ============================
  var PasswordToggle = {
    init: function () {
      var toggleBtn = document.getElementById("togglePassword");
      var passwordInput = document.getElementById("passwordInput");

      if (!toggleBtn || !passwordInput) return;

      var icon = toggleBtn.querySelector("i");
      if (!icon) return;

      toggleBtn.addEventListener("click", function () {
        // Toggle password type
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          passwordInput.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    },
  };

  // ============================
  // Document Ready
  // ============================
  $document.ready(function () {
    Preloader.init();
    SideMenu.init();
    SideMenu2.init();
    SideMenu3.init();
    SidebarToggle.init();
    VideoModal.init();
    StickyHeader.init();
    CounterAnimation.init();
    SearchPopup.init();
    ScrollToTop.init();
    HorizontalScroll.init();
    PriceFilter.init();
    ActiveMenu.init();
    GsapAnimations.init();
    SwiperSliders.init();
    LightGalleryInit.init();
    IsotopeFilter.init();
    AieroEffects.init();
    ThemeToggle.init();
    SideMenu3.init();
    AieroParallax.init();
    OGLDeformEffect.init(".hero-style8", "assets/images/bg/hero8.png");
    OGLDeformEffect.init(".main-sec6", "assets/images/bg/intro-bg.png");
    SignupToggle.init();
    PasswordToggle.init();
  });
})(jQuery);

/**
 * ============================
 * END OF FILE
 * ============================
 */
