<!doctype html>
<html lang="en">
<head>
    @include('components/head')
</head>
<body>
@include('components/nav')

    <h1>{{$course->course_pk}}</h1>
    @foreach($all_questions as $question)
        <a style="text-decoration: none; color: #1a202c" href="/{{$course->course_pk}}/{{$question->q_pk}}">
        <div style="border-bottom: 1px solid #4a5568">
            <h4>{{$question->title}}</h4>
            <p> {{$question->user_fk}}</p>
            <p>{{$question->q_text}}</p>
            <p>{{$question->create_at}}</p>
        </div>
        </a>
    @endforeach
</body>
</html>
