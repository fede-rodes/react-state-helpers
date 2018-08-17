import React from 'react';
import { FormProps } from '../../..';
import Form from './form';
import Feedback from './feedback';

const App = () => (
  <FormProps>
    {({
      disabled,
      errorMsg,
      successMsg,
      handleBefore,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <React.fragment>
        <Form
          btnLabel="Submit"
          onBeforeHook={handleBefore}
          onClientErrorHook={handleClientError}
          onServerErrorHook={handleServerError}
          onSuccessHook={handleSuccess}
        />
        <Feedback
          loading={disabled}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </React.fragment>
    )}
  </FormProps>
);

export default App;