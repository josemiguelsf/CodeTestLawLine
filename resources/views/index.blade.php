<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>CODE TEST MASTER</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="robots" content="all,follow">
        <!-- Bootstrap CSS-->
        <link rel="stylesheet" href="public/frontend/css/bootstrap.css">
        <link rel="stylesheet" href="public/frontend/css/style.css">
        <link rel="stylesheet" href="public/frontend/css/fancybox.css">
        
        <link rel="stylesheet" href="public/frontend/css/font-awesome.css">

       
      </head>
    <body>
<div class="container-fluid p-0 home-content" style="min-height: 400px;">
   
  
    <div id="index"></div>
    
</div>
    <div id="logout" style="display:none"><?php if(isset($logout)) echo $logout;?></div> 
    <div id="urlApi"  style="display:none"><?php  echo config('app.appDir'); ?> </div>
    <div id="footer"></div>      

    </body>
    <script src="public/js/app.js" ></script>
    <script src="public/frontend/js/popper.min.js"></script>
    <script src="public/frontend/js/jquery-3.3.1.min.js"></script>
    <script src="public/frontend/js/bootstrap.min.js"></script>
    <script src="public/frontend/js/fancybox.min.js"></script>
    <script src="public/frontend/js/modernizr.js"></script>
    <script src="public/frontend/js/jquery.validate.js"></script>
    
   
    <script>
    $(window).on("load", function (e){
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");
    });
    </script>
    <script type="text/javascript">
        $(document).ready(function()
        {   
            
            $('.mobile-nav').click(function()
            {
                $('#sidebar').toggleClass('active');
                
                $(this).toggleClass('fa-bars');
                $(this).toggleClass('fa-times');
            });
        });
    </script>
   
</html>