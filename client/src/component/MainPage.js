
import React from "react";

const MainPage = () => {

  (function()
  {
    if( window.localStorage )
    {
      if( !localStorage.getItem('firstLoad') )
      {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }  
      else
        localStorage.removeItem('firstLoad');
    }
  })();
  return (
    <div className="content-wrapper">
      <h5 className="ml-3">Welcome,</h5>
    </div>
  );
};

export default MainPage;
