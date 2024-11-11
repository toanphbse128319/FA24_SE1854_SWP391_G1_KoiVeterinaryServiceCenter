import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { FetchAPI } from "../Helper/Utilities";
import Toast from "./Toast";

async function CheckOTP({ body, setErrors, SendOTP }) {
  try {
    const response = await FetchAPI({
      endpoint: "/Signup/otp/check",
      method: "Post",
      body: body,
    });

    if (!response.ok) {
      // Handle different types of errors
      switch (response.status) {
        case 406:
              if( await response.text() == "There's no OTP code sent to this email" ){
                  SendOTP({ email : body })
                  setErrors((prev) => ({
                      ...prev,
                      general: "Vui lòng nhập mã OTP mới",
                  }));
              } else {
                  setErrors((prev) => ({
                      ...prev,
                      general: "Mã OTP không hợp lệ",
                  }));
              }
          break;
        default:
              setErrors((prev) => ({
                  ...prev,
                  general: "Đã có lỗi xảy ra khi kiểm tra mã OTP",
              }));
      }
      return;
    }
    return "success";
  } catch (error) {
    console.error(error);
    return "failed";
  }
}

export default function OTPForm({ email, onSendOTP, onSwitchLogin }) {
  let navigate = useNavigate();
  // Form states
  const [otp, setOTP] = useState("");
  Toast({message: "Test"});

  // Error states
  const [errors, setErrors] = useState({
    general: "",
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      info: "",
      password: "",
      general: "",
    });

    let hasError = false;
    if (!otp) {
      setErrors((prev) => ({
        ...prev,
        general: "Mã OTP là bắt buộc",
      }));
      hasError = true;
    } else if ( otp.length != 6 ){
      setErrors((prev) => ({
        ...prev,
        general: "Mã OTP phải có 6 số",
      }));
      hasError = true;
    }

    if (hasError) return;

      setIsLoading(true);
      const result = await CheckOTP({ body:{
        info: email,
        password: otp
      }, setErrors: setErrors });
      if (result === "success") {
          onSwitchLogin();
        setIsLoading(false);
      } else {
          setIsLoading(false);
      }
  };

  return (
    <Card
      style={{
        width: "25vw",
        background:
          "linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Nhập mã OTP
        </Typography>

        {errors.general && (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {errors.general}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              height: "55px",
              marginBottom: 16,
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <TextField
              id="otp"
              label="Mã OTP"
              type="text"
              value={otp}
              onChange={(e) => {
                  if( e.target.value.length <= 6 )
                      setOTP(e.target.value);
                // Clear error when typing
                if (errors.otp) {
                  setErrors((prev) => ({ ...prev, otp: "" }));
                }
              }}
              error={Boolean(errors.otp)}
              helperText={errors.otp}
              fullWidth
              required
            />
          </div>

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: -12,
                    }}
                  />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận OTP"
              )}
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

