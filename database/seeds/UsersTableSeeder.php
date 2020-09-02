<?php

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $member = Role::where('name', 'member')->first();
        $admin = Role::where('name', 'admin')->first();
        $user = new User();
        $user->first_name = 'Joseph';
        $user->last_name = 'Osteen';
        $user->email = 'osteen@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($admin);
        $user = new User();
        $user->first_name = 'Janet';
        $user->last_name = 'Mckenzie';
        $user->email = 'janet@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($member);
        $user = new User();
        $user->first_name = 'Louis';
        $user->last_name = 'Smith';
        $user->email = 'louissmith@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($member);
        $user = new User();
        $user->first_name = 'Raymond';
        $user->last_name = 'Thomas';
        $user->email = 'raymond@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($member);
        $user = new User();
        $user->first_name = 'Margaret';
        $user->last_name = 'Anderson';
        $user->email = 'andersonm@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($member);
        $user = new User();
        $user->first_name = 'Mark';
        $user->last_name = 'Hewlett';
        $user->email = 'markh@gmail.com';
        $user->password = Hash::make('password');
        $user->is_active = 1;
        $user->save();
        $user->roles()->attach($member);
    }
}
