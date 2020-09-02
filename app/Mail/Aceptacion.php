<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Aceptacion extends Mailable
{
    use Queueable, SerializesModels;
protected $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
       $this->data = $data;
	    // var_dump($data);
		//die();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
	//$nombre = "franciquito";
	$data = $this->data;
	$template = "emails.aceptacionRed";
	      return $this->view($template, compact('data'));
    }
}
