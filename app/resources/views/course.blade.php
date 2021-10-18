<!doctype html>
<html lang="en">
<head>
    @include('components/head')
    <style>
        #upload form button{
            color: black;
            font-size: large
        }
    </style>
</head>
<body>

    @include('components/nav')
    <!--
    <div id="upload">
        <form id="upload_form">
            <input id="course" type="hidden" value="{{ $course->course_pk }}">
            <input id="user_fk" type="hidden" value="{{ Session::get('email') }}">
            <input id="title" placeholder="Titel"><br>
            <textarea rows="10" cols="30" id="q_text" style="resize: none"></textarea><br>
            <button id="upload_btn">Ladda Upp!</button>
        </form>
    <div>
    -->
    <h1>{{$course->course_pk}}</h1>
    @foreach($all_questions as $question)
        <a style="text-decoration: none; color: #1a202c" href="/{{$question->course_fk}}/{{$question->q_pk}}">
        <div style="border-bottom: 1px solid #4a5568">
            <h4>{{$question->title}}</h4>
            <h6>Kurs: {{ $question->course_fk }}</h6>
            <p> {{$question->name}}</p>
            <p>{{$question->q_text}}</p>
            <p>{{$question->create_at}}</p>
        </div>
        </a>
    @endforeach
</body>
</html>
