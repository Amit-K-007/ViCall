import { MutatingDots } from 'react-loader-spinner'

const Spinner = () => {
    return <MutatingDots
    visible={true}
    height="90"
    width="90"
    color="#1e3a8a"
    secondaryColor="#1e40af"
    radius="12.5"
    ariaLabel="mutating-dots-l  oading"
    wrapperStyle={{}}
    wrapperClass=""
    />;
}

export default Spinner;