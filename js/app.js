var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    savePNGButton = wrapper.querySelector("[data-action=save-png]"),
    saveSVGButton = wrapper.querySelector("[data-action=save-svg]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;


// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

savePNGButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    }
    if(document.getElementById('a').value == ""){
        alert("Please enter a Customer Name");
    }
    if(document.getElementById('b').value == ""){
        alert("Please enter a Business/House Name/No");
    }
    if(document.getElementById('c').value == ""){
        alert("Please enter something on address line 1");
    }
    if(document.getElementById('d').value == ""){
        alert("Please enter a Post Code");
    }
    if(document.getElementById('e').value == ""){
        alert("Please enter a FAO");
    }
    if(document.getElementById('f').value == ""){
        alert("Please enter a Contract Number");
    }
    if(document.getElementById('g').value == ""){
        alert("Please enter a Visit No");
    }
    else {
        document.getElementById('pic').value = signaturePad.toDataURL();
        document.getElementById('pic2').value = localStorage.getItem("sig");
        document.getElementById('thName').value = localStorage.getItem("name2");
        //document.getElementById("myForm").submit();
        formSubmit();   
    }
});

saveSVGButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    }
    if(document.getElementById('techName').value == ""){
        alert("Please enter your name");
    }
    else {
        localStorage.setItem("sig", signaturePad.toDataURL());
        localStorage.setItem("name2", document.getElementById("techName").value)
        window.location.href = "TreatmentReport.html";
    }
});

function formSubmit(){
    $(document).ready(function() {
        $.ajax({
            url:'pdfTest.php',
            type:'post',
            data:$('#myForm').serialize(),
            success:function(){
                alert('yas');
                //window.location.replace("index.html");
            }
        });
    });
}