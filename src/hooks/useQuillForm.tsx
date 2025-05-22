import { useController, UseControllerProps } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillFieldProps extends UseControllerProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  className?: string;
}

const QuillField = ({ name, control, label, ...props }: QuillFieldProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  // Custom color palette
  const COLORS = [
    '#000000', // black
    '#e60000', // red
    '#ff9900', // orange
    '#ffff00', // yellow
    '#008a00', // green
    '#0066cc', // blue
    '#9933ff', // purple
    '#ffffff', // white
    '#facccc', // light red
    '#ffebcc', // light orange
    '#ffffcc', // light yellow
    '#cce8cc', // light green
    '#cce0f5', // light blue
    '#ebd6ff', // light purple
    '#bbbbbb', // light gray
    '#f06666', // medium red
    '#ffc266', // medium orange
    '#ffff66', // medium yellow
    '#66b966', // medium green
    '#66a3e0', // medium blue
    '#c285ff', // medium purple
    '#888888', // medium gray
    '#a10000', // dark red
    '#b26b00', // dark orange
    '#b2b200', // dark yellow
    '#006100', // dark green
    '#0047b2', // dark blue
    '#6b24b2', // dark purple
    '#444444', // dark gray
    '#5c5c5c', // darker gray
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ color: COLORS }, { background: COLORS }], // color and background
        [{ align: [] }],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background', 'align'
  ];

  return (
    <div className={`mb-4 ${props.className || ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <ReactQuill
        theme="snow"
        value={field.value}
        onChange={(content, delta, source, editor) => {
          field.onChange(editor.getHTML());
          console.log(content,delta,source);
          
        }}
        modules={modules}
        formats={formats}
        placeholder={props.placeholder}
        className="bg-white rounded-md [&_.ql-editor]:min-h-[150px]"
      />
    </div>
  );
};

export default QuillField;