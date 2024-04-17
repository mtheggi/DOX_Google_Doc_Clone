import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const CustomizedQuill = ({ value, onChange }) => {
  const TOOLBAR_OPTIONS = [
    ['bold', 'italic'],
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: TOOLBAR_OPTIONS,
      }}
    />
  );
};

CustomizedQuill.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomizedQuill;