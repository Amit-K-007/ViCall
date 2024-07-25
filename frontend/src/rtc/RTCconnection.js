const configuration = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478"
            ]
        }
    ]
};

export class RTCConnection{
    constructor({socket ,socketId}){
        this.socket = socket;
        this.socketId = socketId;
        this.peer = new RTCPeerConnection(configuration);
        this.peer.onnegotiationneeded = this.handleNegotiation.bind(this);
        this.peer.onicecandidate = this.handleIceCandidate.bind(this);
        console.log("rtc class", this.peer);
    }
    
    async handleNegotiation() {
        setTimeout(async () => {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);
            this.socket.emit('nego-start', {
                target: this.socketId,
                sdp: this.peer.localDescription,
            });
        }, 3000);
    }

    addTracks({localStream}) {
        const tracks = localStream.getTracks();
        tracks.forEach((track) => {
            this.peer.addTrack(track, localStream);
        });
    }

    async handleOffer({caller, sdp, localStream}) {
        const desc = new RTCSessionDescription(sdp);
        await this.peer.setRemoteDescription(desc);
        this.addTracks({localStream});
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        this.socket.emit('nego-answer', {
            target: caller,
            sdp: this.peer.localDescription
        });
    }

    async handleAnswer({sdp}) {
        const desc = new RTCSessionDescription(sdp);
        this.peer.setRemoteDescription(desc);
    }

    async handleIceCandidate(event) {
        if(event.candidate){
            this.socket.emit('ice-candidate', {reciever: this.socketId, candidate: event.candidate});
        }
    }
    
    handleIceRequest({cand}) {
        this.peer.addIceCandidate(cand);
    }

    closeVideoCall() {
        if(this.peer){
            this.peer.ontrack = null;
            this.peer.onicecandidate = null;
            this.peer.onnegotiationneeded = null;
            this.peer.close();
            this.peer = null;
        }
    }

    hangUpCall() {
        this.closeVideoCall();
        this.socket.emit('close-call', {socketId: this.socketId});
    }
}
