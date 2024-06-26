<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function user_is_authorized(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/user');

        $response->assertStatus(200);
        $this->assertTrue($response->original);
    }

    /**
     * @test
     */
    public function user_is_unauthorized(): void
    {
        $response = $this->get('/api/user');

        $response->assertStatus(200);
        $this->assertFalse($response->original);
    }

    /**
     * @test
     */
    public function sign_up_with_valid_data(): void
    {
        $data = [
            'email' => 'test@gmail.com',
            'password' => 'testps',
            'password_confirmation' => 'testps',
            'remember' => true,
        ];
        $response = $this->post('/api/sign-up', $data);
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function sign_up_with_invalid_data(): void
    {
        $data = [
            'email' => 'asd',
            'password' => 'asd',
            'password_confirmation' => 'asdadsas',
            'remember' => true,
        ];
        $response = $this->post('/api/sign-up', $data);
        $response->assertStatus(302);
        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function sign_in_with_valid_data(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('testps')
        ]);
        $data = [
            'email' => $user->email,
            'password' => 'testps'
        ];
        $response = $this->post('/api/sign-in', $data);
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function sign_in_with_invalid_data(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('testps')
        ]);
        $data = [
            'email' => $user->email,
            'password' => '1'
        ];
        $response = $this->post('/api/sign-in', $data);
        $response->assertStatus(302);
        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function sign_in_with_wrong_data(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('testps')
        ]);
        $data = [
            'email' => $user->email,
            'password' => 'hjsghkgsjdf'
        ];
        $response = $this->post('/api/sign-in', $data);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function sign_out_authorized_user(): void
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );
        $this->assertAuthenticated('sanctum');
        $response = $this->post('/api/logout');
        $response->assertNoContent();
    }

    /**
     * @test
     */
    public function sign_out_unauthorized_user(): void
    {
        $this->assertGuest('sanctum');
        $response = $this->post('/api/logout');
        $response->assertUnauthorized();
    }
}
