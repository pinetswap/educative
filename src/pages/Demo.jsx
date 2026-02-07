import React, { useEffect, useState } from "react";

const Demo = () => {
  const [confirm, setconfirm] = useState();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword:""
  });

  const handlemail = (e) => {
    setData({
      ...data,
      email: e.target.value,
    });
    
  };
    
  

  const handlepassword = (e) => {
    setData({
      ...data,
      password: e.target.value,
    });
  };
   const handleconfirmpassword = (e) => {
    setData({
      ...data,
      confirmpassword: e.target.value,
    });
  };
  const passwordmatch=data.confirmpassword.length > 0 && data.password === data.confirmpassword;

  const passwordChecker = [
    { test: "characters must be 8 or more", met: /.{8,}/.test(data.password) },
    { test: "atleast one lowercase", met: /[a-z]/.test(data.password) },
    { test: "atleast one uppercase", met: /[A-Z]/.test(data.password) },
    { test: "atleast one digit", met: /[0-9]/.test(data.password) },
    {
      test: "atleast one special character",
      met: /[@#$%^&*(){}]/.test(data.password),
    },
  ];

  // useEffect(() => {}, [data.password]);

  return (
    <div className="flex flex-col gap-4    h-[50vh]  w-[40vh] rounded-2xl  bg-blue-200 p-5 m-[20%] ]">
      <div className="text-3xl font-bold text-center mt-5 mb-[20%]">LOGIN</div>

      <input
        type="email"
        onChange={handlemail}
        placeholder="Enter email"
        className="rounded-2xl p-3 bg-white "
      />

      <input
        type="password"
        placeholder="enter password"
        // value={validator.value}
        onChange={(e) => {
          handlepassword(e);
        }}
        className="rounded-2xl p-3  bg-white "
      />
        
      <div>
  {data.confirmpassword.length > 0 && !passwordmatch && (
    <p style={{ color: "red" }}>Passwords do not match</p>
  )}
</div>
      <input
        type="password"
        placeholder="Confirm password"
        // value={validator.value}
           onChange={(e) => {
          handleconfirmpassword(e);
        }}
      
        className="rounded-2xl p-3  bg-white"
      />
      <div>
        {passwordChecker.map((check, index) => (
          <p
            key={index}
            className={`${
              data.password.length > 0
                ? check.met
                  ? "text-green-500"
                  : "text-red-600"
                : "text-stone-600"
            } `}
          >
            {check.test}
          </p>
        ))}
      </div>

      {/* <div>{
         validator.map((err,index)=>
         (<p key={index}>{err}</p>)
        )
    const [validator,setvalidator]=useState([])     }</div> */}

      <button className="bg-blue-600 ml-40 mr-40 p-2 rounded-2xl">
        Submit
      </button>
    </div>
  );
};

export default Demo;
