nodes = [
    { :hostname => 'master',   :ip => '192.168.0.2', :box => 'ubuntu/xenial64', :ram => '4096' },
    { :hostname => 'worker1',    :ip => '192.168.0.3', :box => 'ubuntu/xenial64' },
    { :hostname => 'worker2',    :ip => '192.168.0.4', :box => 'ubuntu/xenial64' },
  ]
  

Vagrant.configure("2") do |config|
    
    
    nodes.each do |node|
        config.vm.define node[:hostname] do |nodeconfig|
            nodeconfig.vm.box = node[:box]
            nodeconfig.vm.hostname = node[:hostname]
            nodeconfig.vm.network :private_network, ip: node[:ip],
                virtualbox__intnet: true, nic_type: "virtio"
            memory = node[:ram] ? node[:ram] : 2048;
            nodeconfig.vm.provider :virtualbox do |vb|
            vb.customize [
                "modifyvm", :id,
                "--cpuexecutioncap", "50",
                "--memory", memory.to_s,
            ]
            end
        end
        end
    config.vm.define "master" do |master|
        master.vm.network "forwarded_port", guest: 80, host: 80
        master.vm.network "forwarded_port", guest: 8001, host: 8080 
    end
    
    config.vm.provision "ansible" do |ansible|   
        ansible.playbook = "ansible/playbook.yaml"
    end
    
   
  end