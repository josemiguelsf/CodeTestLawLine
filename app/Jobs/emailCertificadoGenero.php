<?php
	
	namespace App\Jobs;
	
	use Illuminate\Bus\Queueable;
	use Illuminate\Queue\SerializesModels;
	use Illuminate\Queue\InteractsWithQueue;
	use Illuminate\Contracts\Queue\ShouldQueue;
	use Illuminate\Foundation\Bus\Dispatchable;
	use Mail;
	//use Illuminate\Mail\Mailable;
	use App\Mail\Certificadogenero;
	
	
	class emailCertificadoGenero implements ShouldQueue
	{
		use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
		
		/**
			* Create a new job instance.
			*
			* @return void
		*/
		protected $data;
		public function __construct($data)
		{
			
			$this->data = $data;
			
		}
		
		/**
			* Execute the job.
			*
			* @return void
		*/
		public function handle()
		{
			// echo $pp;
			$email = $this->data['email'];
			$data = $this->data;
			// var_dump($data);
			//die();
			$email = $data['email']; $filename = $data['filename']; 
			$replyToEmail = $data['replyToEmail']; $out = $data['out'];
			Mail::send($data['template'], ['empresa' => $data['empresa']], function($message) use($email,$filename,$replyToEmail, $out)
			{
				//$userName = $data[0]['first_name']." ".$data[0]['last_name'];
				$message->to($email)->subject('Certificado Concientización Contra Violencia de Género');
				$message->from("info@psicoprod.com", "PsicoProd Dominicana");
				$message->replyTo($replyToEmail);
				$message->attachData($out, $filename);
				$message->attach($temp_file, ['as' => 'Your_Invoice.pdf', 'mime' => 'application/pdf']);

			});
		}
	}
