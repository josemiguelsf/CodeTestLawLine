<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\User;
use Mail;
//use Illuminate\Mail\Mailable;
use App\Mail\Newsletter;
		
class emailNewsletter implements ShouldQueue
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
       //echo "pppoooppopp";
	   //die();
		$this->data = $data;
	
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
	  $email = "josemiguelsf@gmail.com";
	  $data = $this->data;
	 // MAIL::to($email)->bcc($data)->send(new Newsletter());
     MAIL::bcc($data)->send(new Newsletter());

	}
}
