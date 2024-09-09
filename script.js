let linear = true ;
let angleVal = 0 ;
let gradientno = 2 ;
let value;
let anglesVisible = false ;
let circle = true ;
let arr = [0,0,0,0,0,0,0,0,0];
let clrarr = [];
let clutter = ``;
let cluster1 = ``;
let auto = true ;
let interval;

const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const btns = document.querySelectorAll('.clrs');
const allangle = document.querySelectorAll(".angles");
const add = document.querySelector(".add");
const minus = document.querySelector(".minus");
const gradchange = document.querySelector(".changegrad");
const radialtype = document.querySelector(".radialtype");
const angles = document.querySelector(".selectAngles");

const clr1 = document.querySelector("#clr1");
const clr2 = document.querySelector("#clr2");
const clr3 = document.querySelector("#clr3");
const clr4 = document.querySelector("#clr4");
const clr5 = document.querySelector("#clr5");
const clr6 = document.querySelector("#clr6");
const clr7 = document.querySelector("#clr7");
const clr8 = document.querySelector("#clr8");



function genHexCode() {
    let hexCode = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    return hexCode;
}

function updateGradientCount(){
    clutter = ``;
    for(i=1;i<=gradientno;i++){
        clutter+= `<button id="clr${i}">Hex${i}</button>`;
    }
    btns.innerHTML = clutter;
    document.querySelector(".gradientCount").innerHTML = `${gradientno} Colour`
}

function changeTheme(){
    document.querySelector(".copied").classList.add("hidden");
    document.querySelector(".notcopied").classList.remove("hidden");
    var clutter = ``
    for(i=1 ; i<=gradientno ; i++){
        if(arr[i]!= 1){
            clutter+= `<button id="clr${i}" class="clr">Hex${i}</button>`
        }else{
            clutter+= `<button id="clr${i}" class="clr selected">Hex${i}</button>`
        }
        
    }
    for(i=1 ; i<=gradientno ; i++){
        if(arr[i]== 1){
            document.querySelector(`#clr${i}`).classList.add("selected")
        }
    }

    document.querySelector('.clrs').innerHTML = clutter;
    
    if(linear){
        var temp1 = `background : linear-gradient`;
        var temp2 = `${angleVal}deg`;
    }
    else{
        if(circle){
            temp1 = ` background : radial-gradient`
            temp2 = `circle`;
        }else{
            temp1 = ` background : radial-gradient`
            temp2 = `ellipse`
        }
    }


    for(i=1; i<= gradientno ; i++){
        if(arr[i]!= 1){
            clrarr[i] = genHexCode();
        }
        if(clrarr[i]=== clrarr[i-1]){
            clrarr[i] =genHexCode();
        }
        
    }
    clutter1 = `${temp1}(${temp2}`;
    for(i=1 ; i<= gradientno ; i++){
        clutter1+= ` ,${clrarr[i]}`
    }
    clutter1+= ` );`
    document.querySelector('body').setAttribute("style" ,clutter1) 
    h1.textContent = clutter1 ;

    for(i=1 ; i<= gradientno ; i++){
        document.querySelector(`#clr${i}`).setAttribute("style" ,`background-color : ${clrarr[i]}`);
        document.querySelector(`#clr${i}`).textContent = clrarr[i];
    }
}

function automatic(){
    interval1 = setInterval(() => {
        changeTheme();
    }, 2000);
}



//            tl.reverse()      tl.pause()         tl.play()





function copyText(tocopy) {
    var newCopy = tocopy;

    // Get the text from the paragraph element

    const textToCopy = newCopy;
    

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    // Append the textarea to the body (required for the copy command)
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();
    textarea.setSelectionRange(0, 999999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);
    alert('📋 Copied to clipboard ')
}

function showangles(){
    
    allangle.forEach(function(angle){
        angle.classList.remove('hidden');
    })

}

function hideangles(){
    
    allangle.forEach(function(angle){
        angle.classList.add('hidden');
    })

}




var menu = document.querySelector("#nav i");
var close = document.querySelector(".close");

var tl = gsap.timeline()  // default to pause tl = gsap.timeline({paused:true})

tl.to("#nav i",{
    scale:0,
    opacity:0,
    duration:0.4
})

tl.to("#full",{
    bottom:0,
    duration:0.5
})

tl.from("#full button",{
    y:100,
    duration:0.9,
    stagger:0.1,
    opacity:0,
})



tl.pause()

menu.addEventListener("click",function(){
    tl.play()
})

close.addEventListener("click",function(){
    tl.reverse()
})

gradchange.addEventListener("click",function(){
    if(linear){
        gradchange.innerHTML = `Radial
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M438.6 288.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-18.8 0-32 14.3-32 32s14.3 32 32 32l306.8 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                `
        radialtype.classList.remove("hidden");
        angles.classList.add("hidden");
        hideangles();
        angles.innerHTML = `Add Angles` ;
        anglesVisible = false;

        linear = false;
    }else{
        gradchange.innerHTML = `Linear`
        radialtype.classList.add("hidden");
        angles.classList.remove("hidden");
        anglesVisible = true;
        linear = true;
    }
    
})

radialtype.addEventListener("click",function(){
    if(circle){
        circle = false;
        radialtype.textContent = "Ellipse";
    }else{
        circle = true;
        radialtype.textContent = "Circle"
    }
})

minus.addEventListener("click", function(){
    if(gradientno>2){
        gradientno-= 1;
        document.querySelector(".gradcontent").textContent = gradientno;
    }else{
        gradientno = 8 ;
        document.querySelector(".gradcontent").textContent = gradientno;
    }

})

add.addEventListener("click", function(){
    if(gradientno<8){
        gradientno+= 1;
        document.querySelector(".gradcontent").textContent = gradientno;
    }else{
        gradientno= 2;
        document.querySelector(".gradcontent").textContent = gradientno;
    }

})


angles.addEventListener("click",function(e){

    if(anglesVisible){
        hideangles();
        angles.innerHTML = `Add Angles` ;
        anglesVisible = false;
    }
    else{
        showangles();
        angles.innerHTML = `Remove Angles` ;
        anglesVisible = true;
    }
    
})

allangle.forEach(function(angle) {
    angle.addEventListener("click", function() {
        angleVal = angle.textContent
    });
});

btns.forEach(function(btn){
    btn.addEventListener("dblclick", function(e){
        
        const a = e.target.id ;
        let cellid = a[a.length-1];
        
        if(arr[cellid] == 0){
            document.querySelector(`#clr${cellid}`).classList.add("selected")
            arr[cellid] = 1;
        }else{
            document.querySelector(`#clr${cellid}`).classList.remove("selected")
            arr[cellid] = 0;
        }
    });
});


document.querySelector(".displayContent svg").addEventListener("click", function(e) {
    document.querySelector(".copied").classList.remove("hidden");
    document.querySelector(".notcopied").classList.add("hidden");
    copyText(clutter1);

})



document.querySelector("#new").addEventListener("click", function(){
    gsap.to("#new", {
        scale : 0.8,
        duration:0.18,
        yoyo:true,
        repeat:1
    })
    if(!auto){
        changeTheme();
    }
})

document.querySelector(".mode").addEventListener("click", function(e) {
    if(auto){
        document.querySelector(".mode").textContent = `Manual`;
        document.querySelector("#new").classList.remove("hidden");
        clearInterval(interval1);
        auto = false ;
    }else{
        document.querySelector(".mode").textContent = `Auto`;
        document.querySelector("#new").classList.add("hidden");
        auto = true;
        automatic();
    }
})
automatic()


/////////////////////////////////////////////////////////////////////////////////

const tl0 = gsap.timeline();

tl0.from(".t1",{
    y:-80,
    duration:1,
    opacity:0,
    delay:0.5,
    stagger:0.1 ,  // -value for reverse(r-l)  +value for normal(l-r)
    ease:"bounce.out",
    onStart: function() {
        document.getElementById("main").classList.add("hidden");
    },
})

tl0.from(".t2",{
    y:-80,
    duration:1,
    opacity:0,
    delay:0.4,
    stagger:0.1,   // -value for reverse(r-l)  +value for normal(l-r)
    ease: "bounce.out",
})

tl0.to("#home", {
    x: "-120%",
    duration: 2.3,
    delay: 2,
    ease: "power4.in",
    onComplete: function() {
        document.getElementById("home").remove();
        document.getElementById("main").classList.remove("hidden");
    }
});

