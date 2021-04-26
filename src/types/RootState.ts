import { HomeState } from 'app/containers/Home/types';
import { EditorState } from 'app/containers/Editor/types';
import { PresentationState } from 'app/containers/Presentation/types';
import { LoginState } from 'app/containers/Login/types';
import { AuthState } from 'app/containers/Auth/types';
import { RegisterState } from 'app/containers/Register/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  auth?: AuthState;
  login?: LoginState;
  register?: RegisterState;
  home?: HomeState;
  editor?: EditorState;
  presentation?: PresentationState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
