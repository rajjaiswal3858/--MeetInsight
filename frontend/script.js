 
// let recorder;
// let chunks = [];

// let micStream;
// let tabStream;

// async function startRecording() {

//     try {

//         chunks = [];

//         document.getElementById("status").innerText =
//             "Requesting permissions...";

//         micStream = await navigator.mediaDevices.getUserMedia({
//             audio: true
//         });

//         tabStream = await navigator.mediaDevices.getDisplayMedia({
//             video: true,
//             audio: true
//         });

//         const audioContext = new AudioContext();

//         const micSource =
//             audioContext.createMediaStreamSource(micStream);

//         const tabSource =
//             audioContext.createMediaStreamSource(tabStream);

//         const destination =
//             audioContext.createMediaStreamDestination();

//         micSource.connect(destination);
//         tabSource.connect(destination);

//         const mixedStream = destination.stream;

//         recorder = new MediaRecorder(mixedStream);

//         recorder.ondataavailable = e => {

//             if (e.data.size > 0)
//                 chunks.push(e.data);

//         };

//         recorder.onstop = async () => {

//             const blob = new Blob(chunks, {
//                 type: "audio/webm"
//             });

//             const url = URL.createObjectURL(blob);

//             document.getElementById("player").src = url;

//             const formData = new FormData();

//             formData.append("file", blob, "meeting.webm");

//             document.getElementById("status").innerText =
//                 "Uploading audio...";

//             const response = await fetch(
//                 "http://localhost:8000/audio",
//                 {
//                     method: "POST",
//                     body: formData
//                 }
//             );

//             const data = await response.json();

//             console.log(data);

//             document.getElementById("status").innerText =
//                 "Processing done";

//         };

//         recorder.start();

//         document.getElementById("status").innerText =
//             "Recording started";

//     }
//     catch (err) {

//         console.error(err);

//         document.getElementById("status").innerText =
//             "Recording error";

//     }

// }

// function stopRecording() {

//     recorder.stop();

//     micStream.getTracks().forEach(track => track.stop());

//     tabStream.getTracks().forEach(track => track.stop());

// }

let recorder;
let chunks = [];

let micStream;
let tabStream;

// ---------------------------
// START RECORDING
// ---------------------------

async function startRecording(){

    try{

        chunks=[]

        document.getElementById("status").innerText="Requesting permissions..."
        document.getElementById("recording").style.display="flex"

        micStream = await navigator.mediaDevices.getUserMedia({
            audio:true
        })

        tabStream = await navigator.mediaDevices.getDisplayMedia({
            video:true,
            audio:true
        })

        const audioContext = new AudioContext()

        const micSource =
            audioContext.createMediaStreamSource(micStream)

        const tabSource =
            audioContext.createMediaStreamSource(tabStream)

        const destination =
            audioContext.createMediaStreamDestination()

        micSource.connect(destination)
        tabSource.connect(destination)

        const mixedStream = destination.stream

        recorder = new MediaRecorder(mixedStream)

        recorder.ondataavailable = e=>{
            if(e.data.size>0)
                chunks.push(e.data)
        }

        recorder.onstop = async ()=>{

            const blob = new Blob(chunks,{type:"audio/webm"})

            const url = URL.createObjectURL(blob)

            document.getElementById("player").src = url

            const formData = new FormData()

            formData.append("file",blob,"meeting.webm")

            document.getElementById("status").innerText="Uploading audio..."

            const res = await fetch(
                "http://localhost:8000/audio",
                {
                    method:"POST",
                    body:formData
                }
            )

            const data = await res.json()

            console.log(data)

            document.getElementById("status").innerText="Meeting processed ✔"

        }

        recorder.start()

        document.getElementById("status").innerText="Recording started 🎤"

    }

    catch(err){

        console.error(err)

        document.getElementById("status").innerText="Recording error ❌"

    }

}

// ---------------------------
// STOP RECORDING
// ---------------------------

function stopRecording(){

    const confirmUpload = confirm("Are you sure you want to stop and process the meeting audio?");

    if(!confirmUpload){
        return; // user cancelled
    }

    document.getElementById("recording").style.display="none"

    recorder.stop()

    micStream.getTracks().forEach(track=>track.stop())

    tabStream.getTracks().forEach(track=>track.stop())

}
// ---------------------------
// DARK MODE
// ---------------------------

function toggleDark(){

    document.body.classList.toggle("dark")

}

// ---------------------------
// ASK QUESTION
// ---------------------------

async function askQuestion(){

    const q = document.getElementById("question").value

    if(!q) return

    const chatbox = document.getElementById("chatbox")

    chatbox.innerHTML += `
    <div class="message user">
    <b>You:</b> ${q}
    </div>
    `

    document.getElementById("question").value=""

    // AI typing animation

    const typing = document.createElement("div")
    typing.className="typing"
    typing.innerText="AI typing..."
    chatbox.appendChild(typing)

    chatbox.scrollTop = chatbox.scrollHeight

    const res = await fetch(
        "http://localhost:8000/ask",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                question:q
            })
        }
    )

    const data = await res.json()

    typing.remove()

    chatbox.innerHTML += `
    <div class="message ai">
    <b>AI:</b> ${data.answer}
    </div>
    `

    chatbox.scrollTop = chatbox.scrollHeight

}

// ---------------------------
// CLEAR EVERYTHING
// ---------------------------

function clearMeeting(){

    const confirmClear = confirm("Clear meeting data and start fresh?")

    if(!confirmClear) return

    // clear chat
    document.getElementById("chatbox").innerHTML = ""

    // clear question
    document.getElementById("question").value = ""

    // clear audio
    const player = document.getElementById("player")
    player.pause()
    player.src = ""

    // reset status
    document.getElementById("status").innerText = "Ready for new recording"

    // reset chunks
    chunks = []

    console.log("Meeting cleared")

}