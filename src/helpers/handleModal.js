const {default: myConstants} = require('../config/constants');
const {showModal, hideModal} = require('../redux/store');

const handleModal = (status, dispatch) => {
  if (status === myConstants.pending) {
    dispatch(
      showModal({
        title: 'Please Wait!',
        type: myConstants.loading,
        body: 'Fetching data from server...',
        closable: false,
      }),
    );
  } else if (status === myConstants.fulfilled) {
    dispatch(hideModal());
  } else if (status === myConstants.rejected) {
    dispatch(
      showModal({
        title: 'Error!',
        type: myConstants.error,
        body: 'Unable to fetch data from server...',
        closable: true,
      }),
    );
  }
};

export default handleModal;
