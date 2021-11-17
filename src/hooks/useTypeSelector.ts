import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store/reducers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
