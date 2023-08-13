package com.be.service_detail;

import com.be.dto.request.CreateServiceDetailRequest;
import com.be.dto.request.EditServiceDetailRequest;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceDetailService {
    private ServiceDetailRepository serviceDetailRepository;
    private ServiceRepository serviceRepository;

    public void createServiceDetail(CreateServiceDetailRequest createServiceDetailRequest) {
        ServiceEntity service = serviceRepository.findById(createServiceDetailRequest.getServiceId()).orElse(null);
        ServiceDetailEntity serviceDetailEntity = new ServiceDetailEntity(service, createServiceDetailRequest.getName(), createServiceDetailRequest.getPrice(), true);
        serviceDetailRepository.save(serviceDetailEntity);
    }

    public void disableServiceDetail(long id) {
        ServiceDetailEntity serviceDetail = serviceDetailRepository.findById(id).orElse(null);
        serviceDetail.setStatus(false);
        serviceDetailRepository.save(serviceDetail);
    }

    public void enableServiceDetail(long id) {
        ServiceDetailEntity serviceDetail = serviceDetailRepository.findById(id).orElse(null);
        serviceDetail.setStatus(true);
        serviceDetailRepository.save(serviceDetail);
    }

    public void editServiceDetailRequest(EditServiceDetailRequest editServiceDetailRequest) {
        ServiceDetailEntity serviceDetail = serviceDetailRepository.findById(editServiceDetailRequest.getServiceDetailId()).orElse(null);
        serviceDetail.setName(editServiceDetailRequest.getName());
        serviceDetail.setPrice(editServiceDetailRequest.getPrice());
        serviceDetailRepository.save(serviceDetail);
    }
    public List<ServiceDetailEntity> getAllServiceDetails(){
        List<ServiceDetailEntity> list = serviceDetailRepository.findAll();
        return list;
    }
}
