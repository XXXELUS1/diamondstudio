
!function(){
  for(var t,n,r={website:langTemplate()},e=document.querySelectorAll(".js-modalOverlay"),o=document.querySelector(".js-privacyPolicyP"),a=document.querySelector(".js-privacyPolicyInput"),i={},s=0;s<e.length;s++)
    t=e[s].dataset.type,
    i[t]={overlay:e[s],window:e[s].querySelector(".js-modalWindow"),btnClose:e[s].querySelector(".js-modalClose")},
    i[t].btnClose.addEventListener("click",function(){c(this.parentNode.parentNode.dataset.type)}),
    i[t].overlay.addEventListener("click",function(e){e.target===this&&c(this.dataset.type)});

  function l(e){
    if(i[e])
      return i.current?(t=i.current,i.current=!1,c(t),void setTimeout(function(){u(function(){setTimeout(function(){i.current=e,i[e].overlay.classList.add("modal_open"),i[e].window.classList.add("modal__content_open")},100)})},500)):
      void u(function(){setTimeout(function(){i.current=e,i[e].overlay.classList.add("modal_open"),i[e].window.classList.add("modal__content_open")},100)});
  }

  function c(e){
    i[e]&&"current"!==e&&(i[e].window.classList.remove("modal__content_open"),i[e].overlay.classList.remove("modal_open"));
  }

  function u(e){
    return 0<Math.max(document.body.scrollTop,document.documentElement.scrollTop)?
      (window.scrollBy(0,-100),n=setTimeout(function(){u(e)},10)):(clearTimeout(n),e&&e()),!1;
  }

  o.addEventListener("click",function(e){
    "A"!==e.target.tagName&&(a.checked=!a.checked,j(e))
  });

  // 🔁 Заменённый блок — редирект вместо модалки
  document.querySelectorAll(".js-btnToModal").forEach(function(e){
    e.addEventListener("click",function(){
      window.open(https://t.me/diamond_proff", "_blank");
    });
  });

  document.addEventListener("keydown",function(e){
    if("Escape"===e.key)
      for(var t in i)c(t)
  });

  var d,m,f=null,p=location.href.split("studio=");
  p[1]&&(f=parseInt(p[1]),L(100,100,-1e5),l("sign-up")),
  -1!==location.href.indexOf("login")&&null===f&&(L(100,100,-1e5),l("login")),
  -1!==location.href.indexOf("registration")&&(L(100,100,-1e5),l("sign-up")),
  -1!==location.href.indexOf("social")&&(L(100,100,-1e5),l("sign-up")),

  d=new URL(location.href),
  (m=new URLSearchParams(d.search.slice(1))).has("change_password")?
    ajax({action:"ACCEPT CHANGE password",hash:m.get("change_password")},function(e){
      (e=JSON.parse(e)).status&&l("change-password")
    }):
    m.has("remove_profile")&&ajax({action:"ACCEPT REMOVE profile",hash:m.get("remove_profile")},function(e){
      (e=JSON.parse(e)).status&&l("removed")
    });

  var v=document.querySelector(".js-remindPassForm");
  v.addEventListener("submit",function(e){
    e.preventDefault(),v.querySelector("button").disabled=!0,
    ajax({action:"REMIND password",email:v[0].value},function(e){
      v.querySelector("button").disabled=!1,
      (e=JSON.parse(e)).status?(alert(r.website.passwordMailSent),location.href="/?login"):
      (e.error&&-1!=e.error.indexOf("Mailer Error")?alert(r.website.passwordMailError):
        e.msg?alert(e.msg in r.website?r.website[e.msg]:e.msg):alert(r.website.emailNotExist),v[0].focus())
    })
  });

  document.querySelectorAll(".js-registration input").forEach(function(e){
    e.addEventListener("input",j)
  });

  document.querySelector(".js-registration").addEventListener("submit",function(e){
    e.preventDefault();
    var o={action:"NEW model"};
    "onIJCSubmit"in window&&window.onIJCSubmit();
    var t=location.href.split("refer=")[1];
    -1!==location.href.indexOf("social")?o.refSocial=!0:void 0!==t?o.refeler=t.split("#")[0]:f&&(o.studioId=f);
    var a=e.target.closest("form");

    if(a.querySelectorAll("input").forEach(function(e){
      e.dataset&&"ah"in e.dataset?e.checked&&(o.tm_ah=e.dataset.ah):o[e.getAttribute("name")]=e.value
    }),
    o.check_password===o.password){
      var i=e.target.closest("form").querySelector("button");
      i.dataset.registerText=i.innerHTML,i.disabled=!0,i.innerHTML="&hellip;",
      ajax(o,function(e){
        if(i.innerHTML=i.dataset.registerText,i.disabled=!1,(e=JSON.parse(e)).status&&"email"in e){
          "ijcReset"in window&&window.ijcReset(),
          document.querySelector('.js-firstLogin input[name="email"]').value=e.email,
          document.querySelector('.js-firstLogin input[name="email"] + span').innerHTML=e.email;
          var t=document.querySelector(".js-sendAgain");
          t.disabled=!1,t.innerHTML=t.dataset.text,t.title="",l("first-login")
        }else if("id"in e){
          "function"==typeof gtag_report_conversion&&gtag_report_conversion(),
          carrotquest.track("$registered",{$email:o.email,$name:o.name});
          var n="&signup"+(e.auth?"&auth="+e.auth:"")+(e.origin?"&origin="+e.origin:"");
          f?(localStorage.setItem("studioId",f),
          location.search&&location.search.includes("legacy")?
          location.href="/account.php?studio"+n:
          location.href=location.protocol+"//lk."+location.host.replace(/^[^g][^.]+./,"")+"/?studio"+n):
          location.search&&location.search.includes("legacy")?
          location.href="/account.php?login"+n:
          location.href=location.protocol+"//lk."+location.host.replace(/^[^g][^.]+./,"")+"/?login"+n
        }else"warning"in e?e.ijc_disallowed&&e.alternate?_(a,e):(S(a),alert(e.warning),a.querySelector('input[name="email"]').focus()):
          "error"in e?alert(e.error):alert(r.website.serverNotAvailable);
        !("id"in e)&&"ijcReset"in window&&window.ijcReset()
      })
    }else alert(r.website.passwordsNotMatch)
  });

  document.querySelectorAll(".js-login, .js-firstLogin").forEach(function(e){
    e.addEventListener("submit",function(e){
      e.preventDefault();
      !function(e){
        "onIJCSubmit"in window&&window.onIJCSubmit();
        var t={action:"LOGIN model"},
            n=e.target.closest("form");
        n.querySelectorAll("input").forEach(function(e){
          e.dataset&&"ah"in e.dataset?e.checked&&(t.tm_ah=e.dataset.ah):t[e.getAttribute("name")]=e.value
        });
        var o=n.classList.contains("js-firstLogin")?"&signup":"",a=null!=f?"?studio":"?login";
        ajax(t,function(e){
          if((e=JSON.parse(e)).locked){
            var t=document.querySelector(".js-modalOverlay--blocked p");
            t&&(t.innerText=e.reason),l("blocked")
          }else e.removing?l("removed"):
            e.ijc_disallowed?e.alternate?_(n,e):(S(n),alert(e.warning)):
            "id"in e?
              location.href=(location.search&&location.search.includes("legacy")?"/account.php":location.protocol+"//lk."+location.host.replace(/^[^g][^.]+./,"")+"/")+a+(e.id?"="+e.id:"")+o+(e.auth?"&auth="+e.auth:"")+(e.origin?"&origin="+e.origin:""):
              alert(r.website.incorrectData);
          "ijcReset"in window&&(e.locked||e.removing||e.removing||e.warning||e.error)&&window.ijcReset()
        })
      }(e)
    })
  });

  document.querySelector(".js-sendAgain").addEventListener("click",function(e){
    e.preventDefault();
    var n=e.target.closest("button"),
        t=n.closest("form").querySelector('input[name="email"]');
    t&&t.value?(n.disabled=!0,n.innerHTML="&hellip;",ajax({action:"send again",email:t.value},function(e){
      if(!(e=JSON.parse(e)).status){
        var t=r.website.resendError+("undelivered"==e.msg?": "+r.website[e.report&&"_"==e.report.charAt(0)?"resendErrorOverQuota":e.report&&"%"==e.report.charAt(0)?"resendErrorUnavailable":"resendErrorMalformed"]:"");
        return n.innerHTML=n.dataset.unavailableText,n.title=t,void alert(t)
      }
      n.innerHTML=n.dataset.inactiveText,setTimeout(function(e){e.disabled=!1,e.innerHTML=e.dataset.text},6e4,n)
    })):console.error("Resend password form is inconsistent")
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function(e){
    e.addEventListener("click",function(e){
      e.preventDefault(),window.open(this.href)
    })
  });

  var h,g,w,y=document.querySelector(".js-buttonUp");

  function b(){
    y&&(y.classList.remove("modal-button-up--active"),setTimeout(function(){y.classList.remove("modal-button-up--visible")},300))
  }

  function L(e,t,n){
    var o,a=0,i=parseFloat((n/(t/30)).toFixed(2));
    0<n?setTimeout(function(){o=setInterval(function(){(a+=i)<n?window.scrollBy(0,i):clearInterval(o)},30)},e):
    setTimeout(function(){o=setInterval(function(){n<(a+=i)?window.scrollBy(0,i):clearInterval(o)},30)},e)
  }

  function _(e,t){
    var n=e.querySelector(".js-alternameHumanVerification");
    if(n)return n.dataset.ah=t.alternate,n.checked=!1,void(e.classList.contains("js-registration")&&j({target:e}));
    var o=document.createElement("div"),
        a=e.classList.contains("js-registration"),
        i=a?"r":e.classList.contains("js-firstLogin")?"fl":"l";
    o.className="modal__input modal__input_checkbox altername_human_verification",
    o.innerHTML='<input type="checkbox" class="js-alternameHumanVerification" id="input-altername_human_verification_'+i+'" name="altername_human_verification" data-ah="'+t.alternate+'"> <label class="modal__mark-label" for="input-altername_human_verification_'+i+'"></label><p class="modal__text-container"><span class="modal__text-container__text">'+t.warning+"</span></p>",
    a&&o.querySelector('input[type="checkbox"]').addEventListener("change",j),
    o.querySelector("p").addEventListener("click",function(e){
      var t=e.target.closest("div").querySelector('input[type="checkbox"]');
      t.checked=!t.checked,e.target.closest(".js-registration")&&j(e)
    }),
    e.insertBefore(o,e.querySelector("button"))
  }

  function S(e){
    var t=e.querySelector(".js-alternameHumanVerification");
    t&&(t.checked=!1,e.classList.contains("js-registration")&&j({target:e}))
  }

  function j(e){
    var t=e.target.closest(".js-registration");
    if(t){
      var n=t.querySelector("button:last-child"),
          o=Object.values(t.querySelectorAll("input")).filter(function(e){
            return"email"==e.type?!e.value.match(/^[-.0-9A-Za-z]+@[-0-9A-Za-z]{2,}\.[-0-9A-Za-z]{2,}$/):
              !("checkbox"==e.type?e.checked:e.value.length)
          }),
          a=n.classList.contains("disabled");
      o.length&&!a?n.classList.add("disabled"):!o.length&&a&&n.classList.remove("disabled")
    }
  }

  y&&(window.addEventListener("scroll",(h=function(){
    1050<document.body.scrollTop||1050<document.documentElement.scrollTop?
      function(){
        if(!y)return;
        y.classList.add("modal-button-up--visible"),setTimeout(function(){
          y.classList.add("modal-button-up--active")
        },100)
      }():
      (document.body.scrollTop<1e3||document.documentElement.scrollTop<1e3)&&b()
  },g=1e3,w=null,function(){
    null===w&&(h.apply(this,arguments),w=setTimeout(function(){w=null},g))
  })),y.addEventListener("click",function(){
    !function(e,t,n){
      void 0===n&&(n=20);
      var o=t/e;
      o*=n,e/=n;
      var a=window.pageYOffset||document.documentElement.scrollTop,
          i=setInterval(function(){
            a+=o,window.scrollTo(0,a),--e<1&&clearInterval(i)
          },n)
    }(300,-1e4),setTimeout(function(){b()},150)
  })),
  window.addEventListener("load",function(e){
    j({target:document.querySelector(".js-registration")})
  })
}();
