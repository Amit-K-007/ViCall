const configuration = {
    iceServers: [
        {
            urls: "stun:stun.stunprotocol.org"
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

    async addTracks({localStream}) {
        const tracks = localStream.getTracks();
        tracks.forEach((track) => {
            this.peer.addTrack(track, localStream);
        });
    }

    async handleOffer({caller, sdp, localStream}) {
        const desc = new RTCSessionDescription(sdp);
        await this.peer.setRemoteDescription(desc);
        await this.addTracks({localStream});
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

}