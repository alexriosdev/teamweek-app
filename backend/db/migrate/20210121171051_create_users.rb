class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.boolean :admin, default: false
      t.string :email
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :avatar
      t.string :phone_number

      t.timestamps
    end
  end
end
