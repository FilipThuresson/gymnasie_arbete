const pathname = window.location.pathname;
function loadQuestions(){

    $.ajax({
        type: 'post',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: `${pathname}/getAll`,
        success: function (data){
            renderQuestions(JSON.parse(data));
        }
    })
}

$('#upload_form').submit(e=>{
    e.preventDefault();
});

$('#upload_btn').on('click',function(e){

    var course = $('#course').val();
    $("main").html("");

    form_data = {
        course : course,
        user_fk : $('#user_fk').val(),
        title : $('#title').val(),
        q_text : tinyMCE.activeEditor.getContent({format : 'raw'})
    };

    if(form_data.q_text == "<p><br data-mce-bogus=\"1\"></p>"){
        alert("Du måste ha en fråga");
    }else if(form_data.title == ""){
        alert("Du måste ha en titel");
    }else{
        $.ajax({
            type: 'post',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: `/${course}/upload`,
            data: form_data,
            success: function (data){
                loadQuestions();
            }
        })
        close_slide();
        socket.emit('update', socket_pathname);
    }
});

function renderQuestions(data){
    console.log(data);
    if(data.length >0){
        $("main").html(`<h1>${pathname.substring(1)}</h1>`);
        data.forEach(question => {

            var dateNow = new Date();
            var dateUpload =new Date(question.created_at);

            // Beräknar ut antal Sekunder/Minuter/timmar/dagar sedan frågar vad upplagd
            var difference= Math.abs(dateNow-dateUpload);
            seconds = difference/(1000)
            if(seconds > 60 && seconds < 3600){
                seconds =Math.floor(seconds/60);
                if(seconds == 1){
                    seconds += " Minut Sedan"
                }else{
                    seconds += " Minuter Sedan"
                }
            }else if(seconds > 3600 && seconds <(3600*24)){
                seconds =Math.floor((seconds/60)/60);
                if(seconds == 1){
                    seconds += " Timme Sedan"
                }else{
                    seconds += " Timmar Sedan"
                }
            }else if(seconds > (3600*24)){
                seconds =Math.floor(((seconds/60)/60)/24);
                if(seconds == 1){
                    seconds += " Dag Sedan"
                }else{
                    seconds += " Dagar Sedan"
                }
            }else{
                seconds=  Math.floor(seconds);
                seconds += " Sekunder Sedan"
            }


            $("main").append(`
                <div class="question">
                    <br>
                    <div>
                    <h3>${question.post_rubrik}</h3>
                    <span>${seconds}, av <a href="#">@${question.name}</a></span>
                    </div>
                    <p>${question.post_text}</p>
                    <a class="link_to_question" href="/questions/${question.post_pk}">Öppna Frågan</a>
                    <br>
                    <br>
                </div>
            `)
            MathJax.typeset();
        });
    }else{
        $("main").html(`<h1>${pathname.substring(1)}</h1><p>Oooops Här fanns det inga frågor! Publicera den första!</p>`);
    }
}


$(document).ready(function(){
    loadQuestions();
});

//OPEN SLIDE
document.getElementById("aside_btn").addEventListener("click", function(){
    document.getElementById("slide").style.left=0;
    //document.getElementById("footer").style.display = "none";
});

//CLOSE SLIDE
document.getElementById("close_slide").addEventListener("click", function(){
    document.getElementById("slide").style.left="100%";
    //document.getElementById("footer").style.display = "flex";

});

function close_slide(){
    document.getElementById("slide").style.left="100%";
}

socket.on('update', (data)=>{
    console.log(data);
    setTimeout(()=>{
        loadQuestions();
    },1000);
})
