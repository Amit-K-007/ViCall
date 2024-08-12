import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return <RotatingLines
        visible={true}
        height="25"
        width="25"
        color="grey"
        strokeWidth="5"
        strokeColor="white"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />;
}

export default Loading;