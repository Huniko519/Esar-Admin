<?php

namespace App\Http\Traits;

trait PasswordRandom 
{
	protected function getRandomPassword()
	{
		return bin2hex(random_bytes(20));
	}	
}
