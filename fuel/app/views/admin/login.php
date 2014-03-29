<div class="uk-container uk-container-center">
    <div class="login-wrapper">
        <h1>Admina panelis</h1>
        <?php echo Form::open(array('action' => 'EsVaruSaderetKaTuNedomajiKaAdminaPieejaIrSeit', 'class' => 'clear')) ?>
            <?php echo Form::button(null, 'Ienākt', array('class' => 'btn btn-submit')) ?>
            <div class="input-box">
                <?php echo Form::input('username', null, array('placeholder' => 'Lietotājvārds')) ?>
                <?php echo Form::password('passowrd', null, array('placeholder' => 'Parole')) ?>
            </div>
            <div class="label-box">
                <?php echo Form::label('Lietotājvārds', 'username') ?>
                <?php echo Form::label('Parole', 'passowrd') ?>
            </div>
        <?php echo Form::close() ?>
    </div>
</div>