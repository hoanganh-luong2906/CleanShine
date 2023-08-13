package com.be.service;

import com.be.dto.request.CreateServiceRequest;
import com.be.dto.request.EditServiceRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ServiceService {
    private ServiceRepository serviceRepository;

    public ServiceEntity getBusinessInfo(long id) {
        return serviceRepository.findById(id).orElseThrow();
    }


    public void createService(CreateServiceRequest createServiceRequest){
        ServiceEntity service = new ServiceEntity(createServiceRequest.getName(), true, createServiceRequest.getLinkIcon());
        serviceRepository.save(service);
    }
    public void disableService(long id){
        ServiceEntity service = serviceRepository.findById(id).orElse(null);
        service.setStatus(false);
        serviceRepository.save(service);
    }

    public void enableService(long id) {
        ServiceEntity service = serviceRepository.findById(id).orElse(null);
        service.setStatus(true);
        serviceRepository.save(service);
    }

    public void editService(EditServiceRequest editServiceRequest) {
        ServiceEntity service = serviceRepository.findById(editServiceRequest.getServiceId()).orElse(null);
        service.setName(editServiceRequest.getName());
        service.setLinkIcon(editServiceRequest.getLinkIcon());
        serviceRepository.save(service);
    }
}
