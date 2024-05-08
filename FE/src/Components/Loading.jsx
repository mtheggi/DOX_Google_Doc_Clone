
import LoadingGift from '../assets/loading.gif';


const Loading = () => {
    return (
        <div className={`w-full mt-6 h-[100px] flex flex-col items-center justify-center`}>
            <img src={LoadingGift} alt="Loading" className='h-[130px] w-40' />
        </div>
    );
}

export default Loading;