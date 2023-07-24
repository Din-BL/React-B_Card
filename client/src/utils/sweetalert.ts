import Swal from "sweetalert2";

export function removeAlert() {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
}

export function editAlert() {
    return Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    })
}

export function submitAlert() {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you!',
        text: 'Your submission has been sent',
        showConfirmButton: false,
        timer: 1500
    })
}