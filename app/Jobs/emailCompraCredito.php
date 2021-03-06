<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mail;
//use Illuminate\Mail\Mailable;
use App\Mail\Compracredito;
	
class emailCompraCredito implements ShouldQueue
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
	 $email = "info@psicoprod.com";
	  $data = $this->data;
	 // var_dump($data);
		//die();
	   MAIL::to($email)->send(new Compracredito($data));
    }
}
