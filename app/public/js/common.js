var h_hght = 82 // высота шапки
var h_mrg = -27;    // отступ когда шапка уже не видна

$(function(){
 
    var elem = $('.user-panel');
    var top = $(this).scrollTop();
    console.log("top="+top);
    if(top > h_hght){
        elem.css('top', h_mrg);
        elem.addClass('user-panel-fixed');
    }           
     
    $(window).scroll(function(){
        top = $(this).scrollTop();
    	console.log("top="+top);
         
        if (top+h_mrg < h_hght) {
            elem.css('top', (h_hght-top));
            elem.removeClass('user-panel-fixed');
        } else {
            elem.css('top', h_mrg);
            elem.addClass('user-panel-fixed');
        }
    });



});


;(function() {

    function formatDate(date) {
        var monthNames = [
        "января", "февраля", "марта",
        "апреля", "мая", "июня", "июля",
        "августа", "сентября", "октября",
        "ноября", "декабря"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    function createHTML(rezult,mapObject){
        var myUl=document.querySelector(".application-package");

            var myLi=document.createElement("li");
            myLi.className = "application-package__package";

            var link=document.createElement("a");
            link.href="#";          

            var myIMG=document.createElement("img");
            myIMG.className="application-package__image";
            myIMG.src=mapObject[rezult.guid];

            var myHEADER=document.createElement("header");
            myHEADER.className="application-package__header";
            myHEADER.innerHTML=rezult.title;

            var myTime=document.createElement("time");
            myTime.className="application-package__date";
            var myDate = new Date(rezult.lastUpdate);
            myTime.setAttribute("datetime", myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate());//myDate.toLocaleFormat("%Y-%m-%d"))1
            myTime.innerHTML=formatDate(myDate);//myDate.toLocaleFormat("%d ")+getSlantingMonth(myDate.toLocaleFormat("%m"))
            //+myDate.toLocaleFormat(" %Y"); //%B %Y");//"2016-09-09";//rezult.time_text;

            link.appendChild(myIMG);
            link.appendChild(myHEADER);
            link.appendChild(myTime);
            myLi.appendChild(link);
            myUl.appendChild(myLi);
    }

    var slider={
        frame: 0, //относительно последнего индекса массива работаем
        arrPackageAppications: 0,
        myUl: 0,
        arrCircle : document.querySelectorAll(".application-package-row__item"),
        myListRowPackage: document.querySelector(".application-package-row"),
        mapObject: 0,
        init: function(arr, mapObject){
            this.arrPackageAppications = arr;
            this.mapObject = mapObject;
            this.frame = this.arrPackageAppications.length-1;
            this.mapObject = this.createMapObjectGuidLink();
            this.myUl=document.querySelector(".application-package");
            for(var i = 0; i < this.arrCircle.length; i++) {
                this.arrCircle.item(i).addEventListener("click",function(e){slider.slider_items(e);});
            }
            this.arrCircle[0].className="application-package-row__item application-package-row__item-active";
            this.showElements(this.arrPackageAppications.length-1);

        },
        createMapObjectGuidLink: function(){
                var obj = {
                    "e607e5c1-2d9a-4e10-97b4-d9881cbb8e08": "images/shot-2.png",
                    "5d633ad5-b761-42bf-8e60-bf5fd39d867f": "images/shot-1.png",
                    "0665c0cb-7e24-4797-8a83-dd4a16209cd7": "images/shot-3.png",
                    "c50961fb-8573-41b3-98c0-2e6aad0c2f05": "images/shot-2.png",
                    "9148e69b-093f-4b92-a409-dec18ca24bbc": "images/shot-1.png",
                    "20070a51-a807-4e6c-b227-e764167756d3": "images/shot-3.png",
                    "83bcde68-9764-468c-ad60-d899aae5d59c": "images/shot-2.png"
                };
                return obj;
        },
        right: function(){
            this.myUl.innerHTML = "";   
            var index=0;

            if((this.frame+1)===this.arrPackageAppications.length){
                this.frame = 0;
            }
            else {
                this.frame++;
            }

            for(index=this.frame, i=0; i<3;i++, index++){
                if(index===this.arrPackageAppications.length){
                    index=0;
                }
                createHTML(this.arrPackageAppications[index], this.mapObject);
            }
                    
            var allCircle =document.querySelectorAll(".application-package-row__item");
            var elem_active = document.querySelector(".application-package-row__item-active");
            elem_active.className = "application-package-row__item";
            if((this.frame+1)!==this.arrPackageAppications.length)
                allCircle[this.frame+1].className="application-package-row__item application-package-row__item-active";
            else allCircle[0].className="application-package-row__item application-package-row__item-active";
        },
        left: function(){
            this.myUl.innerHTML = "";
            var index=0;
            var allCircle =document.querySelectorAll(".application-package-row__item");
            var elem_active = document.querySelector(".application-package-row__item-active");
            
            elem_active.className = "application-package-row__item";
            allCircle[this.frame].className="application-package-row__item application-package-row__item-active";

            if(this.frame===0){
                this.frame = this.arrPackageAppications.length-1;
            }
            else {
                this.frame--;
            }
            
            for(index=this.frame, i=0; i<3;i++, index++){
                if(index==this.arrPackageAppications.length){
                    index=0;
                }
                createHTML(this.arrPackageAppications[index], this.mapObject);
            }
        },
        showElements: function (index_start){
            
            if(index_start===undefined){
                index_start=0;
            }
            var myUl = document.querySelector(".application-package");

            for(var i = index_start,j=0; j<3; i++,j++){
                
                if(i===(this.arrPackageAppications.length)) i=0;
                if(i<0) i=this.arrPackageAppications.length-1;
                createHTML(this.arrPackageAppications[i],this.mapObject);
            }
        },
        slider_items: function(event){
            for(var i=0; i< this.arrCircle.length;i++){
                if(this.arrCircle[i]===event.target) break;
            }
            var elem_active=document.querySelector(".application-package-row__item-active");
            elem_active.className="application-package-row__item";
            this.arrCircle[i].className="application-package-row__item application-package-row__item-active";
            this.myUl.innerHTML="";
            this.showElements(i-1); 
        },
    }


    

    window.onload = function()
    {
        var codePage = window.location.href.split(/[//?]/);
        //alert(codePage[3]);
        switch(codePage[3]) {

            case 'main': {

                var xhr = new XMLHttpRequest();
                xhr.open("GET","http://localhost:3044/api/shares",true);
                
                xhr.onload = function(e){
                    var response = xhr.responseText;
                    var obj = response;//);
                    //alert(obj);
                    slider.init(obj);
                }

                xhr.send();
            
                var button_next = document.querySelector(".application-package_button-next");
                var button_back = document.querySelector(".application-package_button-back");
               

                button_next.addEventListener("click",function(){slider.right();});
                button_back.addEventListener("click",function(){slider.left();});
                
            } 
            break;
            
            case 'administration': {
                var btnAdminMenuSubmit = document.querySelector('.admin-menu__submit');
              //  btnAdminMenuSubmit.addEventListener("click", adminMenuSubmit);
            } 
            break;
            
            default: {
                alert('default');
            }
            break;
        }

        //var linkToBasket = document.querySelector(".nav-menu__icon");
        //linkToBasket.innerText = localStorage.length;
    }
})();

$(document).ready(function(){
    $('.add-l1').click(function(){
  
         var xhr = new XMLHttpRequest();
        if($('.select-event-l1 option:selected').val()==='add') {
           
            xhr.open("GET","http://localhost:3044/api/administration?level=0&event=add&id="+$('.select-category-l0 option:selected').val()+'&name='+$('.input-category-l1').val(),true);
                    
            xhr.onload = function(e){
                var response = JSON.parse(xhr.responseText);
                // alert(response['insertId']);
                 /*JQuery.each(response, function(i,elem){
                    alert(elem);
                 });  */ 

                $('.select-category-l0').append($("<option/>", {
                    value: response['insertId'],
                    text: $('.input-category-l1').val()
                }));
                //var obj = response;//);
            }

            xhr.send();
        } 

         if($('.select-event-l1 option:selected').val()==='change') {
            xhr.open("GET","http://localhost:3044/api/administration?level=0&event=change&id="+$('.select-category-l0 option:selected').val()+'&name='+$('.input-category-l1').val(),true);
                $('.select-category-l0 option[value='+$('.select-category-l0 option:selected').val()+']').text($('.input-category-l1').val());
            xhr.send();
         }

         if($('.select-event-l1 option:selected').val()==='delete') {
            xhr.open("GET","http://localhost:3044/api/administration?level=0&event=delete&id="+$('.select-category-l0 option:selected').val(),true);
                $('.select-category-l0 option[value='+$('.select-category-l0 option:selected').val()+']').remove();
            xhr.send();
         }


    });

      $('.add-l2').click(function(){
        //alert('click');
         var xhr = new XMLHttpRequest();
        if($('.select-event-l2 option:selected').val()==='add') {
           
            xhr.open("GET","http://localhost:3044/api/administration?level=1&event=add&id="+$('.select-category-l0 option:selected').val()+'&name='+$('.input-category-l2').val(),true);
                    
            xhr.onload = function(e){
                var response =JSON.parse(xhr.responseText);
               
                //alert(xhr.responseText);
                $('.select-category-l1').append($("<option/>", {
                    value: response['insertId'],
                    text: $('.input-category-l2').val()
                }));
                //var obj = response;//);
            }

            xhr.send();
        } 

         if($('.select-event-l2 option:selected').val()==='change') {
            xhr.open("GET","http://localhost:3044/api/administration?level=1&event=change&id="+$('.select-category-l1 option:selected').val()+'&name='+$('.input-category-l2').val(),true);
                $('.select-category-l1 option[value='+$('.select-category-l1 option:selected').val()+']').text($('.input-category-l2').val());
            xhr.send();
         }

         if($('.select-event-l2 option:selected').val()==='delete') {
            alert('delete');
            xhr.open("GET","http://localhost:3044/api/administration?level=1&event=delete&id="+$('.select-category-l1 option:selected').val(),true);
                $('.select-category-l1 option[value='+$('.select-category-l1 option:selected').val()+']').remove();
            xhr.send();
         }
      });


      $('.add-l3').click(function(){
        //alert('click');
         var xhr = new XMLHttpRequest();
        if($('.select-event-l3 option:selected').val()==='add') {
           
            xhr.open("GET","http://localhost:3044/api/administration?level=2&event=add&id="+$('.select-category-l1 option:selected').val()+'&name='+$('.input-category-l3').val(),true);
                    
            xhr.onload = function(e){
                var response =JSON.parse(xhr.responseText);
               
                //alert(xhr.responseText);
                $('.select-category-l2').append($("<option/>", {
                    value: response['insertId'],
                    text: $('.input-category-l3').val()
                }));
                //var obj = response;//);
            }

            xhr.send();
        } 

         if($('.select-event-l3 option:selected').val()==='change') {
            xhr.open("GET","http://localhost:3044/api/administration?level=2&event=change&id="+$('.select-category-l2 option:selected').val()+'&name='+$('.input-category-l3').val(),true);
                $('.select-category-l2 option[value='+$('.select-category-l2 option:selected').val()+']').text($('.input-category-l3').val());
            xhr.send();
         }

         if($('.select-event-l3 option:selected').val()==='delete') {
            alert('delete');
            xhr.open("GET","http://localhost:3044/api/administration?level=2&event=delete&id="+$('.select-category-l2 option:selected').val(),true);
                $('.select-category-l2 option[value='+$('.select-category-l2 option:selected').val()+']').remove();
            xhr.send();
         }
      });
/*    var adminMenuSubmit = function() {
        alert('click');

        var xhr = new XMLHttpRequest();
        xhr.open("GET","http://localhost:3044/api/administration",true);
                
        xhr.onload = function(e){
            var response = xhr.responseText;
            var obj = response;//);
                   // alert(obj);
           // slider.init(obj);
        }

        xhr.send();
    }*/


});