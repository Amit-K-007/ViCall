import Draggable from 'react-draggable';
import ReactPlayer from 'react-player';

const DraggableStream = ({localStream}) => {
    return <Draggable
        bounds="parent">
        <div className="absolute right-5 bottom-5 rounded-full overflow-hidden">
            <div className="w-48 h-48 scale-150 sm:w-60 sm:h-60 sm:scale-150 ">
                <ReactPlayer height={"100%"} width={"100%"} url={localStream} muted playing/>
            </div>
        </div>
    </Draggable>;
}

export default DraggableStream;