const socket = io();
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startScreenShareButton = document.getElementById('startScreenShare');
const startCallButton = document.getElementById('startCall');

let localStream;
let remoteStream;
let peerConnection;

const config = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

async function startScreenShare() {
    try {
        localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        localVideo.srcObject = localStream;
    } catch (err) {
        console.error('Error sharing screen:', err);
    }
}

async function startCall() {
    peerConnection = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        if (!remoteStream) {
            remoteStream = new MediaStream();
            remoteVideo.srcObject = remoteStream;
        }
        remoteStream.addTrack(event.track);
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer);
}

socket.on('offer', async (offer) => {
    peerConnection = new RTCPeerConnection(config);

    peerConnection.ontrack = (event) => {
        if (!remoteStream) {
            remoteStream = new MediaStream();
            remoteVideo.srcObject = remoteStream;
        }
        remoteStream.addTrack(event.track);
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
});

socket.on('answer', async (answer) => {
    await peerConnection.setRemoteDescription(answer);
});

socket.on('ice-candidate', (candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

startScreenShareButton.addEventListener('click', startScreenShare);
startCallButton.addEventListener('click', startCall);
