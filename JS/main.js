
  var imgdatauri; // steg variable
  const fileInput = document.querySelector('#file-js-upload input[type=file]');  // file upload variable under first tab or page
 


// JS for file Upload



function readFilename(){
    if (fileInput.files.length > 0) {
              const fileName = document.querySelector('#file-js-upload .file-name');
              fileName.textContent = fileInput.files[0].name;                
          
}} // end of readFilename



function readURL(input) {    
  if (input.files && input.files[0]) {
    var reader = new FileReader();    

    reader.onload = function(e) {
    document.querySelector("#img_1").src = e.target.result;  // Image Upload
      imgdatauri = e.target.result;
      
    
      // Grade(document.querySelectorAll('#img_1'));
       
    };
  }
  reader.readAsDataURL(input.files[0]);
  readFilename();
  
  
  
//   document.getElementById('resetbtn').style.visibility = "visible" ; // will dislay reset button
  document.getElementById("file-input").disabled = true;  // will disable the Upload button
  document.getElementById("file-label").innerHTML = " Image Uploaded";  // will change the name after upload
  document.getElementById('container_for_embed').style.visibility = "visible" ;  // text area and button to appear or visible  


    // animation
  anime({
    targets: '#img_1',
    translateX: {
      value: '*=2.5', // 100px * 2.5 = '250px'
      duration: 1000
    }, 
    rotate: {
      value: '+=2turn', // 0 + 2 = '2turn'
      duration: 1800,
      easing: 'easeInOutSine'
    },
    direction: 'alternate'
  });  // end of animation
 

} // end of readURL(input) function






// free image download function

document.getElementById('freeimage').addEventListener("click", async function(){
    
    try {
    
        // URL source : https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
      
     
    document.getElementById('freeimage').classList.add('is-loading');   // loading indiator.     
    await axios({
    url: 'https://picsum.photos/200/300?random=1', //your url
    method: 'GET',
    responseType: 'blob', // important
    }).then((response) => {
        const url =  window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'HD Image.png'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
           
    document.getElementById('freeimage').classList.remove('is-loading');   // will remove loading indiator. 
    
        
    } catch (error) {
           // SWAL for error if text Area is Empty empty 
           Swal.fire({
            icon: 'error',
            title: '<p id="swal_title">Unexpected Error Occured !<br> Try Again Later</p>', 
            confirmButtonText: '<p id="swal_confirm" onclick="resetwhen_imgfailed();"><i class="fas fa-check"></i> Ok</p>',        
            confirmButtonColor: '#3e8ed0'  
          }) // end of Sweet Alert          
    }    
    });  // end of free image download 
    

    // this is the function to reset the page if IMAGE Download faild after SWAL event
    function resetwhen_imgfailed(){
      window.location.reload(); // reset page
     } //END of function to reset the page if IMAGE Download faild after SWAL event


    // reset button 

    document.getElementById("resetbtn").addEventListener("click", function(){
    
       
    
        Swal.fire({
            icon: 'question',  
          title: '<p id="swal_title"> Are you sure you want to discard ?</p>',
          // showDenyButton: true,
          showCancelButton: true,
          cancelButtonColor: '#f14668',
          confirmButtonText: `<p id="swal_confirm"><i class="fas fa-check"></i> Yes</p>`,
          cancelButtonText: '<p id="swal_confirm"><i class="fas fa-xmark"></i> No</p>',
          confirmButtonColor: '#3e8ed0'
         
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.reload(); // reset page
          } 
        })
    });  // end of reset function
    



    // Encode AKA Embed function for button

  document.getElementById("convert").addEventListener('click', function(){


    if (document.querySelector('#txtarea').value == "") {
      Swalempty();  // Swal Pop Up.
    } else {
      document.querySelector("#img_2").src = steg.encode(document.querySelector('#txtarea').value, imgdatauri);  // get value of text area and embed to picture 
      document.querySelector("#txtarea").readOnly = true; // will set text area to read only mode
      document.getElementById("convert").style.display = "none" ; // will remove the embed button
      document.getElementById("saveAs").style.display = "inline" ; // will reinstate the SaveAs button
      document.getElementById("imgtxt_result").style.display = "block" ; // will reinstate the Text for Embeded image
      document.getElementById("img_2").style.display = "block" ; // will display the Embeded image


      
 

    } // end of else block


})  // End of Encode function



// Decode button

function decode(input) { 

  // will remove instaces of image and text once system uloaded it once
  document.getElementById("img_3").style.display = "none"; 
  document.getElementById("imgtxt_decode").style.display = "none";  // for image Text to appear



  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {       

      document.querySelector("#img_3").src = e.target.result;    
      
      // document.querySelector('#decoded').innerHTML  = steg.decode(e.target.result);
    };     
  }
  reader.readAsDataURL(input.files[0]);     
  document.getElementById("file-label-decode").innerHTML = "   " +input.files[0].name;  // will rename the button upload using the file name.

  
  

  // document.getElementById("file-input-decode").disabled = true;   // Upload button will be in Disabled Mode

  document.getElementById("decode_btn").style.display = "block";  // Decode button to appear / show

  
} // End of Decode button



// Button to decode the message
  document.getElementById("decode_btn").addEventListener('click', function(){

    var hiddencode = steg.decode(document.querySelector("#img_3"));

    if (hiddencode == "") {
       // SWAL for error if text Area is Empty empty 
       Swal.fire({
        icon: 'error',
        title: '<p id="swal_title"> Image does not contain any message !</p>',         
        confirmButtonText: '<p id="swal_confirm"><i class="fas fa-check"></i> Ok</p>',        
        confirmButtonColor: '#3e8ed0'  
      }) // end of Sweet Alert 
    } else {

      var textresult =  steg.decode(document.querySelector("#img_3"));  // Image to render to IMG 3 PlaceHolder 
      // document.getElementById("imgtxt_decode").style.display = "block";  // for image Text to appear
      // document.getElementById("img_3").style.display = "block";  // for image to appear

        


     
      
      // SWAL for message if Successfull
      Swal.fire({
        icon: 'success',
        title: `<p id="swal_title_success"> Message Is: </p>`, 
        html: `<p id="swal_title_success_message"> ${textresult} </p>`,
        confirmButtonText: '<p id="swal_confirm" onclick="animation_ok();"><i class="fas fa-check"></i> Ok</p>',        
        confirmButtonColor: '#3e8ed0'  
      }) // SWAL for message if Successfull

         

    }

  })  // End of Button to decode the message
  




  // button function for SAVEAs
  document.querySelector('#saveAs').addEventListener('click', ()=> {

    var savepath = document.querySelector('#img_2').getAttribute('src');  // get the IMG SRC name 
    saveAs(savepath, "HD Wallpaper.png");  // Download and Rename file to HD Wallpaper.png
   
  }) // End of button function for SAVEAs


  

  // sweet alert function if empty string 

  function Swalempty(){
        // SWAL for error if text Area is Empty empty 
        Swal.fire({
          icon: 'info',
          title: '<p id="swal_title"> User Input is Required !</p>', 
          confirmButtonText: '<p id="swal_confirm"><i class="fas fa-check"></i> Ok</p>',        
          confirmButtonColor: '#3e8ed0'  
        }) // end of Sweet Alert 

  } // End ofsweet alert function if empty string 



// Sweet alert for Developer info 
function devinfo(){
    
  Swal.fire({
    html: ` <center><figure class="image is-128x128 mt-3">
              <img src="/IMG/Jeng.gif" id="dev_img">
              </figure></center> 
              <br>                   
              <p class="mt-3" id="swal_title_success_message"> 
              <a href="https://en.wikipedia.org/wiki/Steganography" target="_blank" title="More Information via Wikipedia Link." style="float:left;"  > 
              <strong><i>Steganography ~</i></strong></a>
               Is the technique of hiding secret data within an ordinary, non-secret, file or message (<strong>example is an Image</strong>) in order to avoid detection.
              <br>
              <br>
              This project is done and created by <strong>James Paul</strong> a.k.a 
              <a href="https://github.com/rockstartraders" target="_blank"> 
              <strong>@Rockstartraders.</strong></a>
              <br>
              <br>
              With the help of the following:
              <br>
              <a href="https://www.peter-eigenschink.at/projects/steganographyjs/" target="_blank"> 
              <strong>Steganography.js</strong></a>
              <br>
              <a href="https://animejs.com/" target="_blank"> 
              <strong>Anime JS</strong></a>
              <br>
              <a href="https://bulma.io/" target="_blank"> 
              <strong>Bulma CSS</strong></a>
              <br>
              <a href="https://github.com/eligrey/FileSaver.js" target="_blank"> 
              <strong>FileSaver.js</strong></a>
              <br>
              <a href="https://github.com/sweetalert2/sweetalert2" target="_blank"> 
              <strong>Sweetalert2</strong></a>
              <br>
              <a href="https://unsplash.com/" target="_blank"> 
              <strong>Unsplash</strong></a>
              </p>
              `,  // end of html for Developer info.
    
    confirmButtonText: `<p id="swal_confirm">I Don't Care</p>`,        
    confirmButtonColor: '#3e8ed0'  
  })


}// End of Sweet alert for Developer info 



// function for animation after clicking Ok if contains message

function animation_ok(){

  document.getElementById("imgtxt_decode").style.display = "block";  // for image Text to appear
  document.getElementById("img_3").style.display = "block";  // for image to appear
   // animation
   anime({
    targets: '#img_3',    
    direction: 'alternate',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},  // easeInOutQuad   easeOutSine
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(50, {grid: [14, 5], from: 'center'}),
    translateX: {
      value: '*=2.5', // 100px * 2.5 = '250px'
      duration: 1000
    },
    rotate: {
      value: '+=2turn', // 0 + 2 = '2turn'
      duration: 1000,
      easing: 'easeInOutSine'
    },
    loop:false
    

  });  // end of animation
} // End of function for animation after clicking Ok if contains message