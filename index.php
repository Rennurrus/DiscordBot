<?php ?>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<!-- 
        <script>
           $.ajax({
                url: 'http://localhost:5000',
                type: 'post',
                dataType: 'json',
                data: {nickname:"Дай номерок Марины"},
                success: function(data) {
                    console.log('response:', data);
                }
            });
            console.log('POST sended');
		</script> 
	-->
    <body>
		<div class="row" id="form"> 
			<div class="col-md-4">
			</div>
			<div class="col-md-4">
			<div class="jumbotron">

			<?if(!empty($errors)) {?>
					<div class="alert alert-danger" role="alert">
					<div class="text-center">
					<h1> Ошибка </h1>
					</div>
						<ul>
							<?foreach ($errors as $error){?>
								<li><?=$error?></li>
							<?}?>
						</ul>
					</div>
				<?}?>

			  <form method="post" action="">
				<div class="form-group">
					<label class="postformtext" for="exampleInputEmail1">Ваше имя:</label>
					<input type="text" class="form-control" id="exampleInputEmail1" name="name" aria-describedby="emailHelp" value="<?=$name?>">
				</div>
				<div class="form-group">
					<label class="postformtext" for="exampleInputPassword1">Ваша фамилия:</label>
					<input type="text" name="secondname" class="form-control" id="exampleInputPassword1" value="<?=$secondname?>">
				</div>
				<div class="form-group">
					<label class="postformtext" for="exampleInputPassword1">Ваш номер телефона:</label>
					<input type="text" name="phone" class="form-control" id="exampleInputPassword1" value="<?=$phone?>">
				</div>
				<div class="form-group">
					<label class="postformtext" for="exampleInputPassword1">Ваш адрес электронной почты:</label>
					<input type="text" name="email" class="form-control" id="exampleInputPassword1" value="<?=$email?>">
				</div>
				  <button type="submit" name="send" class="btn btn-success btn-lg btn-block">Отправить заявку</button>
				  <br/> 
			  </form></div> </div>
			  <div class="col-md-4">
			  </div>
			  </div>
				<? } else { ?>
				  <div class="row" id="form">
				  <div class="col-md-4">
          			</div>
					<div class="col-md-4" style="text-align:center;">

					<div class="jumbotron">
					<div class="text-center">
					<div class="alert alert-success" role="alert">
						<h1>
							Ваша заявка принята! 
						</h1>
					</div>
						<h3>
							Мы отправили к вам группу 
						</h3>
						<h3>
							кибОргов-жнецов
						</h3>
					</div>
						<p> <img alt="кибОрг" src="/static/img/necron.jpg" style="width:100%; text-align: center;" /> </p>
						<p><span class="postformtext">Ваши данные:</span></p>
						<p><span class="postformtext">Имя: <?=$_SESSION['data'][0]?></span></p>
						<p><span class="postformtext">Фамилия: <?=$_SESSION['data'][1]?></span></p>
						<p><span class="postformtext">Телефон: <?=$_SESSION['data'][2]?></span></p>
						<p><span class="postformtext">Mail: <?=$_SESSION['data'][3]?></span></p>
						<div class="col">
							<div class = "text-center">
								<form method="post" action="">
									<button type="submit" name="goback" class="btn btn-success btn-lg btn-block">Вернуться</button>
								</form>
							</div>
					</div>
					</div>
          </div>
          </div>
						  <?}?>
		</div>
	</div>
    </body>
</html>    
    

