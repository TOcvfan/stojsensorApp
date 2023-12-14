import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Input,
  inputBaseClasses,
  FormControl,
  InputLabel
} from "@/lib/mui";
import { BiShow, BiHide } from "react-icons/bi";
import { amber, green, pink, purple } from "@mui/material/colors";

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: green[800],
    borderWidth: 3,
    borderRadius: 10
  },
  "&:hover:valid + fieldset": {
    borderColor: amber[500]
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    borderColor: purple[700],
    color: pink[100],
    padding: "4px !important"
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: amber[500],
      color: "orange"
    }
  }
});

const color = {
  input: {
    color: pink[100],
  },
  label: {
    color: "blue"
  },
  fieldset: {
    border: "2px solid purple",
    borderRadius: "16px",
    boxShadow: "purple 0px 5px 15px"
  }
}

const StyledInput = styled((props) => (
  <Input {...props} />
))(({ color }) => ({
  borderRadius: 10,
  borderColor: color,
  borderWidth: 3,
  padding: 4,
  [`&.${inputBaseClasses.multiline}`]: {
    height: "auto",
    border: `3px solid ${green[800]}`,
    color: pink[100]
  }
}));

const Multiline = (props) => {
  return (
    <FormControl variant="outlined" sx={{ width: props.width }}>
      <InputLabel>{props.errors ? props.errors.message : props.label}</InputLabel>
      <StyledInput
        sx={{
          "&:hover": {
            borderColor: amber[500],
            borderWidth: 3
          },
          "&.Mui-focused": {
            borderColor: purple[700],
            color: pink[100],
            padding: "4px !important"
          }
        }}
        defaultValue={props.defaultValue}
        onChange={(e) => props.onChange(e.target.value)}
        error={!props.errors ? false : true}
        disableUnderline
        multiline
        rows={props.rows}
      />
    </FormControl>
  );
};

const Password = (props) => {
  const [showPass, setShowPass] = useState(false);
  const errorhandle = () => {
    if (props.errors === undefined) {
      return false;
    } else return true
  }
  const passWordIcon = () =>
    showPass ? (
      <BiHide size={40} onClick={() => setShowPass(false)} style={{ position: 'absolute', right: '2%', cursor: 'pointer', zIndex: 9 }} />
    ) : (
      <BiShow size={40} onClick={() => setShowPass(true)} style={{ position: 'absolute', right: '2%', cursor: 'pointer', zIndex: 9 }} />
    );
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        position: 'relative',
        width: props.width,
      }}
    >
      <ValidationTextField
        label={props.errors ? props.errors.message : props.label}
        required
        error={errorhandle()}
        onChange={(e) => props.onChange(e.target.value)}
        type={showPass ? "text" : "password"}
        variant="outlined"
        defaultValue={props.defaultValue}
        sx={{
          width: props.width,
          color
        }}
      />
      {passWordIcon()}
    </Box >
  );
};

const TextInput = (props) => {
  return (
    <ValidationTextField
      autoFocus={props.autoFocus}
      label={props.errors ? props.errors.message : props.label}
      required={props.required}
      error={!props.errors ? false : true}
      type={props.type}
      onChange={(e) => props.onChange(e.target.value)}
      sx={{
        width: props.width,
        color
      }}
      variant="outlined"
      defaultValue={props.defaultValue}
    />
  );
};

const SelectText = ({ children, type, defaultValue, value, width, onChange, required, errors, label, id, select }) => {
  return (
    <ValidationTextField
      id={id}
      label={errors ? errors.message : label}
      required={required}
      error={!errors ? false : true}
      type={type}
      select={select}
      onChange={onChange}
      value={value}
      sx={{
        width: width,
        color
      }}
      variant="outlined"
      defaultValue={defaultValue}
    >
      {children}
    </ValidationTextField>
  )
}

export default function Text({ children, type, defaultValue, value, width, onChange, required, errors, label, id, autoFocus, rows, select }) {
  const inputType = (type) => {
    switch (type) {
      case "multiline":
        return <Multiline width={width} errors={errors} label={label} onChange={onChange} rows={rows} defaultValue={defaultValue} />;
      case "password":
        return <Password width={width} errors={errors} label={label} onChange={onChange} defaultValue={defaultValue} />;
      case "select":
        return <SelectText width={width} errors={errors} label={label} select={select} onChange={onChange} defaultValue={defaultValue} required={required} value={value} id={id}>{children}</SelectText>
      default:
        return <TextInput width={width} errors={errors} label={label} onChange={onChange} defaultValue={defaultValue} required={required} autoFocus={autoFocus} />;
    }
  };

  return <Box sx={{ mt: '10px', mb: '10px' }}>{inputType(type)}</Box>;
}